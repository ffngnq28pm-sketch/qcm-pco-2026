import { useQuiz } from '../context/QuizContext';
import { useTimer } from '../hooks/useTimer';
import Timer from './Timer';
import Question from './Question';
import styles from './Quiz.module.css';

export default function Quiz() {
  useTimer();
  const {
    questions, questionIndex, reponseSelectionnee,
    score, tempsRestant, candidat, validerReponse
  } = useQuiz();

  const question = questions[questionIndex];
  const progression = ((questionIndex) / questions.length) * 100;

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

      <div className={styles.progressWrap}>
        <div className={styles.progressFill} style={{ width: `${progression}%` }} />
      </div>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <span className={`badge badge-navy`}>{question.categorie}</span>
          <span className={styles.counter}>
            Question {questionIndex + 1} / {questions.length}
          </span>
        </div>

        <div className={`card ${styles.questionCard}`}>
          <Question
            question={question}
            reponseSelectionnee={reponseSelectionnee}
            onValider={validerReponse}
          />
        </div>

        <p className={styles.hint}>Cliquez sur une réponse pour valider.</p>
      </main>
    </div>
  );
}
