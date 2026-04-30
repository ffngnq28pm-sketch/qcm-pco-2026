import { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import Signature from './Signature';
import styles from './Classement.module.css';

function formatTemps(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function telechargerClassementCSV(classement) {
  const lignes = [
    ['#', 'Prénom', 'Score', 'Total', 'Pourcentage', 'Temps', 'Date'],
    ...classement.map((e, i) => [i + 1, e.nom, e.score, e.total, `${e.pourcentage}%`, formatTemps(e.temps), e.date])
  ];
  const csv = lignes.map(l => l.join(';')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `classement_QCM_PCO_2026.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const medals = ['🥇', '🥈', '🥉'];
const ADMINS = ['charif', 'carlos', 'céline g.', 'celine g.', 'céline g', 'celine g', 'souad'];

export default function Classement() {
  const { classement, retourAccueil, resetClassement, candidat } = useQuiz();
  const estAdmin = ADMINS.includes(candidat.trim().toLowerCase());

  const [sessions, setSessions]           = useState([]);
  const [sessionOuverte, setSessionOuverte] = useState(null);

  useEffect(() => { chargerSessions(); }, []);

  async function chargerSessions() {
    try {
      const res = await fetch('/api/sessions');
      if (res.ok) setSessions(await res.json());
    } catch {}
  }

  async function handleReset() {
    if (!window.confirm('Sauvegarder cette session et réinitialiser le classement ?')) return;
    try {
      await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manager: candidat, classement })
      });
    } catch {}
    await resetClassement();
    chargerSessions();
  }

  async function supprimerSession(id) {
    if (!window.confirm('Supprimer cette session archivée ?')) return;
    try {
      const res = await fetch(`/api/sessions/${id}`, { method: 'DELETE' });
      if (res.ok) setSessions(await res.json());
    } catch {}
  }

  async function supprimerToutesSessions() {
    if (!window.confirm('Supprimer définitivement toutes les sessions archivées ?')) return;
    try {
      const res = await fetch('/api/sessions', { method: 'DELETE' });
      if (res.ok) { setSessions([]); setSessionOuverte(null); }
    } catch {}
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logoBar} />
        <div>
          <div className={styles.headerTitle}>Classement général</div>
          <div className={styles.headerSub}>{classement.length} participant{classement.length !== 1 ? 's' : ''}</div>
        </div>
        <div className={styles.headerSpacer} />
        {estAdmin && classement.length > 0 && (
          <>
            <button className={`btn-ghost ${styles.resetBtn}`} onClick={() => telechargerClassementCSV(classement)}>
              📥 Exporter CSV
            </button>
            <button className={`btn-ghost ${styles.resetBtn}`} onClick={handleReset}>
              💾 Sauvegarder &amp; Réinitialiser
            </button>
          </>
        )}
        <button className="btn-primary" onClick={retourAccueil}>← Accueil</button>
        <Signature />
      </header>

      <main className={styles.main}>

        {/* ── Classement actif ── */}
        {classement.length === 0 ? (
          <div className={`card ${styles.emptyCard}`}>
            <span className={styles.emptyIcon}>🏁</span>
            <p className={styles.emptyText}>Aucune session en cours.</p>
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
                  <tr><th>#</th><th>Participant</th><th>Score</th><th>%</th><th>Temps</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {classement.map((e, i) => (
                    <tr key={e.id} className={e.nom === candidat ? styles.highlight : ''}>
                      <td className={styles.rankCell}>{i < 3 ? medals[i] : <span className={styles.rankNum}>{i + 1}</span>}</td>
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

        {/* ── Sessions archivées ── */}
        {(sessions.length > 0 || estAdmin) && (
          <div className={styles.sessionsSection}>
            <div className={styles.sessionsHeader}>
              <div className={styles.sessionsTitleWrap}>
                <span className={styles.sessionsIcon}>🗂</span>
                <h2 className={styles.sessionsTitle}>Sessions archivées</h2>
                <span className={styles.sessionsBadge}>{sessions.length}</span>
              </div>
              {estAdmin && sessions.length > 0 && (
                <button className={`btn-ghost ${styles.deleteAllBtn}`} onClick={supprimerToutesSessions}>
                  🗑 Tout supprimer
                </button>
              )}
            </div>

            {sessions.length === 0 ? (
              <p className={styles.sessionsEmpty}>Aucune session archivée pour l'instant.</p>
            ) : (
              <div className={styles.sessionsList}>
                {sessions.map(session => (
                  <div key={session.id} className={`card ${styles.sessionCard}`}>
                    <div
                      className={styles.sessionCardHeader}
                      onClick={() => setSessionOuverte(sessionOuverte === session.id ? null : session.id)}
                    >
                      <div className={styles.sessionInfo}>
                        <span className={styles.sessionManager}>{session.manager}</span>
                        <span className={styles.sessionMeta}>
                          {session.date} · {session.participants} participant{session.participants !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className={styles.sessionActions}>
                        {estAdmin && (
                          <button
                            className={`btn-ghost ${styles.deleteSessionBtn}`}
                            onClick={e => { e.stopPropagation(); supprimerSession(session.id); }}
                          >
                            🗑
                          </button>
                        )}
                        <span className={styles.sessionChevron}>
                          {sessionOuverte === session.id ? '▲' : '▼'}
                        </span>
                      </div>
                    </div>

                    {sessionOuverte === session.id && (
                      <div className={styles.sessionBody}>
                        <table className={styles.sessionTable}>
                          <thead>
                            <tr><th>#</th><th>Participant</th><th>Score</th><th>%</th><th>Temps</th></tr>
                          </thead>
                          <tbody>
                            {session.classement.map((e, i) => (
                              <tr key={e.id}>
                                <td>{i < 3 ? medals[i] : <span className={styles.rankNum}>{i + 1}</span>}</td>
                                <td className={styles.nomCell}>{e.nom}</td>
                                <td className={styles.scoreCell}>{e.score}/{e.total}</td>
                                <td>
                                  <span className={`${styles.pctBadge} ${e.pourcentage >= 80 ? styles.pctHaut : e.pourcentage >= 60 ? styles.pctMid : styles.pctBas}`}>
                                    {e.pourcentage}%
                                  </span>
                                </td>
                                <td className={styles.tempsCell}>{formatTemps(e.temps)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
