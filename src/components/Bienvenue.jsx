import { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { getMessagePrenom, getEncouragement } from '../data/messages';
import styles from './Bienvenue.module.css';

export default function Bienvenue() {
  const { candidat, lancerQuiz } = useQuiz();
  const [compteur, setCompteur] = useState(5);

  const infoPrenom   = getMessagePrenom(candidat);
  const encouragement = getEncouragement();

  // Compte à rebours auto → lance le quiz
  useEffect(() => {
    if (compteur <= 0) { lancerQuiz(); return; }
    const t = setTimeout(() => setCompteur(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [compteur, lancerQuiz]);

  return (
    <div className={styles.page}>
      <div className={styles.bg} />

      <div className={styles.content}>

        {/* Salutation */}
        <div className={`${styles.card} ${styles.cardSalut} animate-fadeUp`}>
          <span className={styles.wave}>👋</span>
          <h1 className={styles.titre}>
            Bienvenue, <span className={styles.nom}>{candidat}</span> !
          </h1>
        </div>

        {/* Etymologie / culture */}
        {infoPrenom ? (
          <div className={`${styles.card} ${styles.cardEtym} animate-fadeUp delay-1`}>
            <div className={styles.cardIconWrap}>
              <span className={styles.cardIcon}>📖</span>
              <span className={styles.cardLabel}>Le saviez-vous ?</span>
              <span className={`badge badge-green ${styles.origBadge}`}>{infoPrenom.origine}</span>
            </div>
            <p className={styles.etymTexte}>{infoPrenom.texte}</p>
          </div>
        ) : (
          <div className={`${styles.card} ${styles.cardEtym} animate-fadeUp delay-1`}>
            <div className={styles.cardIconWrap}>
              <span className={styles.cardIcon}>✨</span>
              <span className={styles.cardLabel}>Un prénom unique</span>
            </div>
            <p className={styles.etymTexte}>
              Votre prénom est peut-être rare dans nos archives, mais les personnes qui sortent des sentiers battus sont souvent celles qui marquent leur époque.
            </p>
          </div>
        )}

        {/* Encouragement */}
        <div className={`${styles.card} ${styles.cardEncourage} animate-fadeUp delay-2`}>
          <div className={styles.cardIconWrap}>
            <span className={styles.cardIcon}>💪</span>
            <span className={styles.cardLabel}>Un mot avant de commencer</span>
          </div>
          <p className={styles.encourageTexte}>« {encouragement} »</p>
        </div>

        {/* Bouton + compteur */}
        <div className={`${styles.actionWrap} animate-fadeUp delay-3`}>
          <button className={`btn-primary ${styles.btnLancer}`} onClick={lancerQuiz}>
            C'est parti ! →
          </button>
          <span className={styles.autoLabel}>
            Démarrage automatique dans <strong>{compteur}s</strong>
          </span>
        </div>

      </div>
    </div>
  );
}
