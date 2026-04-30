import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { questions, CONFIG } from '../data/questions';

const QuizContext = createContext(null);

export const PHASES = {
  ACCUEIL: 'accueil',
  BIENVENUE: 'bienvenue',
  QUIZ: 'quiz',
  INTER_QUESTION: 'inter_question',
  RESULTATS: 'resultats',
  CLASSEMENT: 'classement'
};

const initialState = {
  phase: PHASES.ACCUEIL,
  candidat: '',
  questionIndex: 0,
  reponseSelectionnee: null,
  score: 0,
  tempsRestant: CONFIG.tempsTotal,
  tempsDebut: null,
  tempsTotal: 0,
  reponses: [],
  classement: [],
  derniereReponseCorrecte: null,
  entreeId: null
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'DEMARRER_QUIZ':
      return {
        ...state,
        phase: PHASES.BIENVENUE,
        candidat: action.candidat,
        questionIndex: 0,
        reponseSelectionnee: null,
        score: 0,
        tempsRestant: CONFIG.tempsTotal,
        tempsDebut: Date.now(),
        reponses: [],
        derniereReponseCorrecte: null,
        entreeId: null
      };

    case 'LANCER_QUIZ':
      return { ...state, phase: PHASES.QUIZ };

    case 'VALIDER_REPONSE': {
      const question = questions[state.questionIndex];
      const correcte = action.reponse === question.bonneReponse;
      return {
        ...state,
        phase: PHASES.INTER_QUESTION,
        reponseSelectionnee: action.reponse,
        score: state.score + (correcte ? CONFIG.pointsParBonneReponse : 0),
        reponses: [...state.reponses, { questionId: question.id, reponse: action.reponse, correcte }],
        derniereReponseCorrecte: correcte
      };
    }

    case 'QUESTION_SUIVANTE': {
      const nextIndex = state.questionIndex + 1;
      if (nextIndex >= questions.length) return { ...state, phase: PHASES.RESULTATS };
      return {
        ...state,
        phase: PHASES.QUIZ,
        questionIndex: nextIndex,
        reponseSelectionnee: null,
        derniereReponseCorrecte: null
      };
    }

    case 'METTRE_A_JOUR_TEMPS':
      return { ...state, tempsRestant: action.tempsRestant };

    case 'TERMINER_QUIZ': {
      const tempsTotal = Math.round((Date.now() - state.tempsDebut) / 1000);
      return { ...state, phase: PHASES.RESULTATS, tempsTotal };
    }

    case 'SYNC_CLASSEMENT':
      return { ...state, classement: action.classement };

    case 'SET_ENTREE_ID':
      return { ...state, entreeId: action.id };

    case 'VOIR_CLASSEMENT':
      return { ...state, phase: PHASES.CLASSEMENT };

    case 'RETOUR_ACCUEIL':
      return { ...initialState, classement: state.classement };

    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const pollingRef = useRef(null);

  // Charger le classement depuis l'API
  async function fetchClassement() {
    try {
      const res = await fetch('/api/classement');
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: 'SYNC_CLASSEMENT', classement: data });
      }
    } catch {
      // Pas de connexion : ignore silencieusement
    }
  }

  // Polling toutes les 5 secondes pendant le quiz et l'inter-question
  useEffect(() => {
    fetchClassement();

    const actif = [PHASES.QUIZ, PHASES.INTER_QUESTION, PHASES.RESULTATS].includes(state.phase);
    if (actif) {
      pollingRef.current = setInterval(fetchClassement, 5000);
    }
    return () => clearInterval(pollingRef.current);
  }, [state.phase]);

  const demarrerQuiz = useCallback((candidat) => {
    dispatch({ type: 'DEMARRER_QUIZ', candidat });
  }, []);

  const lancerQuiz = useCallback(() => {
    dispatch({ type: 'LANCER_QUIZ' });
  }, []);

  const validerReponse = useCallback((reponse) => {
    dispatch({ type: 'VALIDER_REPONSE', reponse });
  }, []);

  const questionSuivante = useCallback(() => {
    dispatch({ type: 'QUESTION_SUIVANTE' });
  }, []);

  const terminerQuiz = useCallback(async () => {
    // Calculer le temps avant de dispatcher pour avoir tempsDebut encore dispo
    const tempsTotal = Math.round((Date.now() - state.tempsDebut) / 1000);
    dispatch({ type: 'TERMINER_QUIZ' });

    const entree = {
      nom: state.candidat,
      score: state.score,
      total: questions.length,
      pourcentage: Math.round((state.score / questions.length) * 100),
      temps: tempsTotal,
      date: new Date().toLocaleDateString('fr-FR')
    };

    try {
      const res = await fetch('/api/classement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entree)
      });
      if (res.ok) {
        const classement = await res.json();
        dispatch({ type: 'SYNC_CLASSEMENT', classement });
      }
    } catch {
      // Fallback local si pas de serveur
      const classement = [...state.classement, { ...entree, id: Date.now() }]
        .sort((a, b) => b.score - a.score || a.temps - b.temps);
      dispatch({ type: 'SYNC_CLASSEMENT', classement });
    }
  }, [state.candidat, state.score, state.tempsDebut, state.classement]);

  const mettreAJourTemps = useCallback((tempsRestant) => {
    dispatch({ type: 'METTRE_A_JOUR_TEMPS', tempsRestant });
  }, []);

  const voirClassement = useCallback(() => {
    dispatch({ type: 'VOIR_CLASSEMENT' });
  }, []);

  const retourAccueil = useCallback(() => {
    dispatch({ type: 'RETOUR_ACCUEIL' });
  }, []);

  const resetClassement = useCallback(async () => {
    try {
      const res = await fetch('/api/classement', { method: 'DELETE' });
      if (res.ok) dispatch({ type: 'SYNC_CLASSEMENT', classement: [] });
    } catch {
      dispatch({ type: 'SYNC_CLASSEMENT', classement: [] });
    }
  }, []);

  // Position du candidat actuel dans le classement
  const positionClassement = (() => {
    const idx = state.classement.findIndex(
      e => e.nom === state.candidat && e.score === state.score
    );
    return idx >= 0 ? idx + 1 : 0;
  })();

  return (
    <QuizContext.Provider value={{
      ...state,
      PHASES,
      questions,
      CONFIG,
      positionClassement,
      demarrerQuiz,
      lancerQuiz,
      validerReponse,
      questionSuivante,
      terminerQuiz,
      mettreAJourTemps,
      voirClassement,
      retourAccueil,
      resetClassement
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}
