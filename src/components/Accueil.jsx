import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import Signature from './Signature';
import styles from './Accueil.module.css';

export default function Accueil() {
  const { demarrerQuiz, voirClassement, classement, questions, CONFIG } = useQuiz();
  const [nom, setNom] = useState('');
  const [erreur, setErreur] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = nom.trim();
    if (!trimmed) { setErreur('Veuillez saisir votre nom ou identifiant.'); return; }
    if (trimmed.length < 2) { setErreur('Au moins 2 caractères requis.'); return; }
    demarrerQuiz(trimmed);
  }

  const minutes = Math.floor(CONFIG.tempsTotal / 60);

  return (
    <div className={styles.page}>
      {/* ── Section hero sombre ── */}
      <div className={styles.hero}>
        <header className={styles.header}>
          <div className={styles.logoBar} />
          <div>
            <div className={styles.headerTitle}>EGIS PCO</div>
            <div className={styles.headerSub}>Plateforme de formation interne</div>
          </div>
          <div className={styles.headerSpacer} />
          {classement.length > 0 && (
            <button className={`btn-ghost ${styles.clsBtn}`} onClick={voirClassement}>
              Classement ({classement.length})
            </button>
          )}
        </header>

        <div className={styles.heroContent}>
          <span className="badge badge-green">Session 2026</span>
          <h1 className={styles.heroTitle}>
            QCM <span>Finance, RH,</span><br />Contrats &amp; Processus PCO
          </h1>
          <p className={styles.heroSub}>
            Évaluez vos connaissances sur les processus clés de la Direction Financière
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}>📋</span>
              {questions.length} questions
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}>⏱</span>
              {minutes} minutes
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatIcon}>🏆</span>
              Top 10 en direct
            </div>
          </div>
        </div>
      </div>

      {/* ── Section claire ── */}
      <div className={styles.content}>
        <div className={`card ${styles.formCard}`}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Accéder au quiz</h2>
            <p className={styles.formDesc}>Saisissez votre nom pour commencer l'évaluation.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrap}>
              <label htmlFor="nom" className={styles.label}>Nom / Identifiant</label>
              <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  id="nom"
                  type="text"
                  className={styles.input}
                  placeholder="Ex : Marie Dupont"
                  value={nom}
                  onChange={e => { setNom(e.target.value); setErreur(''); }}
                  maxLength={60}
                  autoFocus
                />
              </div>
              {erreur && <span className={styles.erreur}>⚠ {erreur}</span>}
            </div>
            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={!nom.trim()}>
              Commencer le quiz →
            </button>
          </form>

          <div className={styles.rules}>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>⏱</span>
              <span>Temps global de <strong>{minutes} min</strong> pour l'ensemble du quiz</span>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✓</span>
              <span><strong>1 point</strong> par bonne réponse · départage au temps</span>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>🏆</span>
              <span>Classement mis à jour après chaque question</span>
            </div>
          </div>
        </div>

        {classement.length > 0 && (
          <div className={`card ${styles.topCard}`}>
            <div className={styles.topHeader}>
              <span className={styles.topIcon}>🏆</span>
              <span className={styles.topTitle}>Top 3 actuel</span>
            </div>
            <div className={styles.topList}>
              {classement.slice(0, 3).map((e, i) => (
                <div key={e.id} className={styles.topItem}>
                  <span className={styles.topRank}>{i + 1}</span>
                  <span className={styles.topNom}>{e.nom}</span>
                  <span className={styles.topScore}>{e.score}/{e.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Signature />
    </div>
  );
}
