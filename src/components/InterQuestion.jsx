import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useTimer } from '../hooks/useTimer';
import Timer from './Timer';
import Top10 from './Top10';
import styles from './InterQuestion.module.css';

const LETTRES = ['A', 'B', 'C', 'D'];

export default function InterQuestion() {
  useTimer();
  const {
    questions, questionIndex, reponseSelectionnee, derniereReponseCorrecte,
    score, tempsRestant, candidat, classement, questionSuivante, terminerQuiz
  } = useQuiz();

  const question = questions[questionIndex];
  const bonneReponse = question.bonneReponse;
  const isLast = questionIndex === questions.length - 1;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLast) terminerQuiz();
      else questionSuivante();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoBar} />
        <div className={styles.headerInfo}>
          <span className={styles.candidatLabel}>{candidat}</span>
          <span className={styles.scoreLabel}>{score} pt{score > 1 ? 's' : ''}</span>
        </div>
        <div className={styles.headerSpacer} />
        <Timer secondes={tempsRestant} />
      </header>

      <main className={styles.main}>
        <div className={`card ${styles.feedbackCard}`}>
          <div className={`${styles.feedbackBanner} ${derniereReponseCorrecte ? styles.correct : styles.wrong}`}>
            <span className={styles.feedbackIcon}>{derniereReponseCorrecte ? '✓' : '✗'}</span>
            <span className={styles.feedbackText}>
              {derniereReponseCorrecte ? 'Bonne réponse !' : 'Mauvaise réponse'}
            </span>
          </div>

          <div className={styles.questionRecap}>
            <p className={styles.questionTexte}>{question.texte}</p>
            <div className={styles.reponsesList}>
              {question.reponses.map((rep, i) => (
                <div
                  key={i}
                  className={`${styles.repItem}
                    ${i === bonneReponse ? styles.repCorrect : ''}
                    ${i === reponseSelectionnee && i !== bonneReponse ? styles.repWrong : ''}
                  `}
                >
                  <span className={styles.repLettre}>{LETTRES[i]}</span>
                  <span>{rep}</span>
                  {i === bonneReponse && <span className={styles.checkmark}>✓</span>}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.nextInfo}>
            {isLast
              ? 'Calcul des résultats en cours…'
              : `Question suivante dans quelques secondes…`}
          </div>
        </div>

        <div className={styles.top10Wrap}>
          <Top10 classement={classement} candidatActuel={candidat} compact />
        </div>

        <button
          className={`btn-primary ${styles.nextBtn}`}
          onClick={isLast ? terminerQuiz : questionSuivante}
        >
          {isLast ? 'Voir mes résultats →' : 'Question suivante →'}
        </button>
      </main>
    </div>
  );
}
