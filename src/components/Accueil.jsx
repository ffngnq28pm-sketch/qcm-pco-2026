import { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
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
      <header className={styles.header}>
        <div className={styles.logoBar} />
        <div>
          <div className={styles.headerTitle}>Egis PCO</div>
          <div className={styles.headerSub}>Plateforme de formation</div>
        </div>
        <div className={styles.headerSpacer} />
        {classement.length > 0 && (
          <button className={`btn-ghost ${styles.clsBtn}`} onClick={voirClassement}>
            Classement ({classement.length})
          </button>
        )}
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroAccent} />
          <span className={`badge badge-green ${styles.heroBadge}`}>Session 2026</span>
          <h1 className={styles.heroTitle}>QCM Finance, RH,<br />Contrats &amp; Processus PCO</h1>
          <p className={styles.heroSub}>
            {questions.length} questions · {minutes} minutes · Classement en temps réel
          </p>
        </div>

        <div className={`card ${styles.formCard}`}>
          <h2 className={styles.formTitle}>Accès au quiz</h2>
          <p className={styles.formDesc}>Saisissez votre nom ou identifiant pour commencer.</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputWrap}>
              <label htmlFor="nom" className={styles.label}>Nom / Identifiant</label>
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
              {erreur && <span className={styles.erreur}>{erreur}</span>}
            </div>
            <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={!nom.trim()}>
              Commencer le quiz →
            </button>
          </form>

          <div className={styles.rules}>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>⏱</span>
              <span>Temps global de <strong>{minutes} min</strong> pour l'ensemble des questions</span>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>✓</span>
              <span><strong>1 point</strong> par bonne réponse, départage au temps</span>
            </div>
            <div className={styles.ruleItem}>
              <span className={styles.ruleIcon}>🏆</span>
              <span>Top 10 affiché après chaque question</span>
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
      </main>
    </div>
  );
}
