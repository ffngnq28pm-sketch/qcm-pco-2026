import { useQuiz } from '../context/QuizContext';
import Signature from './Signature';
import styles from './Classement.module.css';

function formatTemps(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

const medals = ['🥇', '🥈', '🥉'];

export default function Classement() {
  const { classement, retourAccueil, resetClassement, candidat } = useQuiz();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoBar} />
        <div>
          <div className={styles.headerTitle}>Classement général</div>
          <div className={styles.headerSub}>{classement.length} participant{classement.length > 1 ? 's' : ''}</div>
        </div>
        <div className={styles.headerSpacer} />
        <button className={`btn-ghost ${styles.resetBtn}`} onClick={() => {
          if (window.confirm('Réinitialiser tout le classement ?')) resetClassement();
        }}>
          Réinitialiser
        </button>
        <button className="btn-primary" onClick={retourAccueil}>← Accueil</button>
      </header>

      <main className={styles.main}>
        {classement.length === 0 ? (
          <div className={`card ${styles.emptyCard}`}>
            <p className={styles.emptyText}>Aucun résultat enregistré.</p>
            <button className="btn-primary" onClick={retourAccueil}>Commencer le quiz</button>
          </div>
        ) : (
          <>
            <div className={styles.podiumWrap}>
              {classement.slice(0, 3).map((e, i) => (
                <div key={e.id} className={`${styles.podiumItem} ${styles[`podium${i + 1}`]}`}>
                  <span className={styles.podiumMedal}>{medals[i]}</span>
                  <span className={styles.podiumNom}>{e.nom}</span>
                  <span className={styles.podiumScore}>{e.score}/{e.total}</span>
                  <span className={styles.podiumPct}>{e.pourcentage}%</span>
                </div>
              ))}
            </div>

            <div className={`card ${styles.tableCard}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Participant</th>
                    <th>Score</th>
                    <th>%</th>
                    <th>Temps</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {classement.map((e, i) => (
                    <tr key={e.id} className={`${e.nom === candidat ? styles.highlight : ''} ${i < 10 ? styles.top10 : ''}`}>
                      <td className={styles.rankCell}>
                        {i < 3 ? medals[i] : <span className={styles.rankNum}>{i + 1}</span>}
                      </td>
                      <td className={styles.nomCell}>{e.nom}</td>
                      <td className={styles.scoreCell}>{e.score}/{e.total}</td>
                      <td>
                        <span className={`${styles.pctBadge} ${e.pourcentage >= 80 ? styles.pctHaut : e.pourcentage >= 60 ? styles.pctMid : styles.pctBas}`}>
                          {e.pourcentage}%
                        </span>
                      </td>
                      <td className={styles.tempsCell}>{formatTemps(e.temps)}</td>
                      <td className={styles.dateCell}>{e.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
      <Signature />
    </div>
  );
}
