import { useQuiz } from '../context/QuizContext';
import Top10 from './Top10';
import styles from './Resultats.module.css';

function formatTemps(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function getNiveau(pct) {
  if (pct >= 80) return { label: 'Excellent', color: '#22c55e' };
  if (pct >= 60) return { label: 'Bien', color: '#7AC143' };
  if (pct >= 40) return { label: 'Passable', color: '#f59e0b' };
  return { label: 'À revoir', color: '#ef4444' };
}

export default function Resultats() {
  const {
    candidat, score, questions, tempsTotal,
    reponses, classement, voirClassement, retourAccueil, positionClassement
  } = useQuiz();

  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const niveau = getNiveau(pct);
  const mauvaises = total - score;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoBar} />
        <span className={styles.headerTitle}>Résultats — {candidat}</span>
      </header>

      <main className={styles.main}>
        <div className={`card ${styles.scoreCard}`}>
          <div className={styles.scoreCircleWrap}>
            <div className={styles.scoreCircle} style={{ '--pct': `${pct}%`, '--color': niveau.color }}>
              <span className={styles.scoreNum}>{pct}%</span>
              <span className={styles.scoreNiveau} style={{ color: niveau.color }}>{niveau.label}</span>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statValue} style={{ color: 'var(--correct)' }}>{score}</span>
              <span className={styles.statLabel}>Bonnes réponses</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue} style={{ color: 'var(--wrong)' }}>{mauvaises}</span>
              <span className={styles.statLabel}>Mauvaises réponses</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>{formatTemps(tempsTotal)}</span>
              <span className={styles.statLabel}>Temps total</span>
            </div>
            {positionClassement > 0 && (
              <>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statValue}>#{positionClassement}</span>
                  <span className={styles.statLabel}>Classement</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={`card ${styles.detailCard}`}>
          <h3 className={styles.detailTitle}>Détail par question</h3>
          <div className={styles.detailList}>
            {reponses.map((r, i) => (
              <div key={i} className={`${styles.detailRow} ${r.correcte ? styles.detailOk : styles.detailKo}`}>
                <span className={styles.detailQ}>Q{i + 1}</span>
                <span className={styles.detailIcon}>{r.correcte ? '✓' : '✗'}</span>
                <span className={styles.detailTexte}>{questions[i].texte.slice(0, 70)}{questions[i].texte.length > 70 ? '…' : ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.top10Wrap}>
          <Top10 classement={classement} candidatActuel={candidat} />
        </div>

        <div className={styles.actions}>
          <button className="btn-primary" onClick={voirClassement}>Classement complet →</button>
          <button className="btn-secondary" onClick={retourAccueil}>Retour à l'accueil</button>
        </div>
      </main>
    </div>
  );
}
