import styles from './Question.module.css';

const LETTRES = ['A', 'B', 'C', 'D'];

export default function Question({ question, reponseSelectionnee, onValider }) {
  return (
    <div className={styles.container}>
      <div className={styles.texte}>{question.texte}</div>
      <div className={styles.reponses}>
        {question.reponses.map((rep, i) => (
          <button
            key={i}
            className={`${styles.repBtn} ${reponseSelectionnee === i ? styles.selected : ''}`}
            onClick={() => reponseSelectionnee === null && onValider(i)}
            disabled={reponseSelectionnee !== null}
          >
            <span className={styles.lettre}>{LETTRES[i]}</span>
            <span className={styles.repTexte}>{rep}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
