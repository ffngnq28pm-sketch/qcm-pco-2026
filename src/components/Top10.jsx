import styles from './Top10.module.css';

const medals = ['🥇', '🥈', '🥉'];

export default function Top10({ classement, candidatActuel, compact = false }) {
  const top = classement.slice(0, 10);

  if (top.length === 0) return null;

  return (
    <div className={`${styles.container} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <span className={styles.trophy}>🏆</span>
        <span className={styles.title}>Top 10</span>
      </div>
      <div className={styles.list}>
        {top.map((entry, i) => {
          const isCurrentUser = entry.nom === candidatActuel;
          return (
            <div key={entry.id} className={`${styles.row} ${isCurrentUser ? styles.highlight : ''}`}>
              <span className={styles.rank}>
                {i < 3 ? medals[i] : <span className={styles.rankNum}>{i + 1}</span>}
              </span>
              <span className={styles.nom}>{entry.nom}</span>
              <span className={styles.score}>{entry.score}<span className={styles.scoreTotal}>/{entry.total}</span></span>
              <span className={styles.temps}>{formatTemps(entry.temps)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatTemps(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}
