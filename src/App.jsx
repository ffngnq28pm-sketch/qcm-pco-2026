import { useQuiz, PHASES } from './context/QuizContext';
import Accueil from './components/Accueil';
import Bienvenue from './components/Bienvenue';
import Quiz from './components/Quiz';
import InterQuestion from './components/InterQuestion';
import Resultats from './components/Resultats';
import Classement from './components/Classement';
import './App.css';

export default function App() {
  const { phase } = useQuiz();

  return (
    <>
      {phase === PHASES.ACCUEIL       && <Accueil />}
      {phase === PHASES.BIENVENUE     && <Bienvenue />}
      {phase === PHASES.QUIZ          && <Quiz />}
      {phase === PHASES.INTER_QUESTION && <InterQuestion />}
      {phase === PHASES.RESULTATS     && <Resultats />}
      {phase === PHASES.CLASSEMENT    && <Classement />}
    </>
  );
}
