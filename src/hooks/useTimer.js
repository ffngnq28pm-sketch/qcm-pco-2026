import { useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';

export function useTimer() {
  const { phase, tempsRestant, mettreAJourTemps, terminerQuiz, PHASES } = useQuiz();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (phase !== PHASES.QUIZ) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      if (tempsRestant <= 1) {
        clearInterval(intervalRef.current);
        terminerQuiz();
      } else {
        mettreAJourTemps(tempsRestant - 1);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [phase, tempsRestant, mettreAJourTemps, terminerQuiz, PHASES]);
}
