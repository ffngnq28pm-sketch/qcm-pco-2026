import styles from './Timer.module.css';

export default function Timer({ secondes }) {
  const m = Math.floor(secondes / 60).toString().padStart(2, '0');
  const s = (secondes % 60).toString().padStart(2, '0');
  const danger = secondes <= 30;
  const warning = secondes <= 120 && !danger;

  return (
    <div className={`${styles.timer} ${danger ? styles.danger : warning ? styles.warning : ''}`}>
      <span className={styles.icon}>⏱</span>
      <span className={styles.time}>{m}:{s}</span>
    </div>
  );
}
