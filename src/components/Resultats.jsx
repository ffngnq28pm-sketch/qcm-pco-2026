import { useQuiz } from '../context/QuizContext';
import Top10 from './Top10';
import Signature from './Signature';
import { getCitationResultat } from '../data/messages';
import styles from './Resultats.module.css';

function formatTemps(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function telechargerResultatsCSV({ candidat, score, total, pct, tempsTotal, reponses, questions, positionClassement }) {
  const lignes = [
    ['Prénom', 'Score', 'Total', 'Pourcentage', 'Temps', 'Position'],
    [candidat, score, total, `${pct}%`, formatTemps(tempsTotal), positionClassement > 0 ? `#${positionClassement}` : '-'],
    [],
    ['#', 'Question', 'Catégorie', 'Résultat'],
    ...reponses.map((r, i) => [
      i + 1,
      `"${questions[i].texte.replace(/"/g, '""')}"`,
      questions[i].categorie,
      r.correcte ? 'Correcte' : 'Incorrecte'
    ])
  ];
  const csv = lignes.map(l => l.join(';')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `resultats_${candidat}_QCM_PCO_2026.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function getNiveau(pct) {
  if (pct >= 80) return { label: 'Excellent', color: '#16a34a' };
  if (pct >= 60) return { label: 'Bien',      color: '#7AC143' };
  if (pct >= 40) return { label: 'Passable',  color: '#f59e0b' };
  return               { label: 'À revoir',   color: '#ef4444' };
}

const CIRCUMFERENCE = 2 * Math.PI * 52; // ≈ 326.7

export default function Resultats() {
  const {
    candidat, score, questions, tempsTotal,
    reponses, classement, voirClassement, retourAccueil, positionClassement
  } = useQuiz();

  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const niveau = getNiveau(pct);
  const mauvaises = total - score;
  const dashOffset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  const citation = getCitationResultat(pct);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoBar} />
        <div>
          <div className={styles.headerTitle}>Résultats</div>
          <div className={styles.headerSub}>{candidat}</div>
        </div>
        <div className={styles.headerSpacer} />
        <Signature />
      </header>

      <main className={styles.main}>
        {/* Score card */}
        <div className={`card ${styles.scoreCard}`}>
          <div className={styles.scoreTop}>
            <div className={styles.circleWrap}>
              <svg viewBox="0 0 120 120" className={styles.svg}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke={niveau.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 60 60)"
                  className={styles.progressCircle}
                />
              </svg>
              <div className={styles.circleInner}>
                <span className={styles.pctNum}>{pct}%</span>
                <span className={styles.pctLabel} style={{ color: niveau.color }}>{niveau.label}</span>
              </div>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statVal} style={{ color: 'var(--correct)' }}>{score}</span>
                <span className={styles.statKey}>Bonnes<br/>réponses</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statVal} style={{ color: 'var(--wrong)' }}>{mauvaises}</span>
                <span className={styles.statKey}>Mauvaises<br/>réponses</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statVal}>{formatTemps(tempsTotal)}</span>
                <span className={styles.statKey}>Temps<br/>total</span>
              </div>
              {positionClassement > 0 && (
                <div className={`${styles.statBox} ${styles.statBoxHighlight}`}>
                  <span className={styles.statVal} style={{ color: 'var(--egis-green-dark)' }}>#{positionClassement}</span>
                  <span className={styles.statKey}>Votre<br/>position</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Détail */}
        <div className={`card ${styles.detailCard}`}>
          <h3 className={styles.detailTitle}>Détail par question</h3>
          <div className={styles.detailList}>
            {reponses.map((r, i) => (
              <div key={i} className={`${styles.detailRow} ${r.correcte ? styles.detailOk : styles.detailKo}`}>
                <span className={styles.detailQ}>Q{i + 1}</span>
                <span className={styles.detailIcon}>{r.correcte ? '✓' : '✗'}</span>
                <span className={styles.detailTexte}>
                  {questions[i].texte.slice(0, 75)}{questions[i].texte.length > 75 ? '…' : ''}
                </span>
                <span className={`badge ${styles.detailCat}`}>{questions[i].categorie}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Citation philosophique */}
        <div className={`card ${styles.citationCard}`}>
          <span className={styles.citationGuillemet}>"</span>
          <p className={styles.citationTexte}>{citation.texte}</p>
          <span className={styles.citationAuteur}>— {citation.auteur}</span>
        </div>

        <div className={styles.top10Wrap}>
          <Top10 classement={classement} candidatActuel={candidat} />
        </div>

        <div className={styles.actions}>
          <button className="btn-primary" onClick={voirClassement}>Classement complet →</button>
          <button className="btn-ghost" onClick={() => telechargerResultatsCSV({ candidat, score, total, pct, tempsTotal, reponses, questions, positionClassement })}>
            📥 Télécharger mes résultats
          </button>
          <button className="btn-secondary" onClick={retourAccueil}>← Accueil</button>
        </div>
      </main>
    </div>
  );
}
