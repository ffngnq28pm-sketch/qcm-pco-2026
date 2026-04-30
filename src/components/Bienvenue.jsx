import { useMemo } from 'react';
import { useQuiz } from '../context/QuizContext';
import { getMessagePrenom, getEncouragement } from '../data/messages';
import styles from './Bienvenue.module.css';

export default function Bienvenue() {
  const { candidat, lancerQuiz } = useQuiz();

  const infoPrenom    = getMessagePrenom(candidat);
  const encouragement = useMemo(() => getEncouragement(), []);

  const perso = infoPrenom?.messagePersonnel;

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

        {/* Message basé sur le prénom : perso si dispo, sinon étymologie */}
        <div className={`${styles.card} ${perso ? styles.cardPerso : styles.cardEtym} animate-fadeUp delay-1`}>
          <div className={styles.cardIconWrap}>
            <span className={styles.cardIcon}>{perso ? perso.icone : '📖'}</span>
            <span className={styles.cardLabel}>{perso ? perso.label : 'Le saviez-vous ?'}</span>
            {!perso && infoPrenom && (
              <span className={`badge badge-green ${styles.origBadge}`}>{infoPrenom.origine}</span>
            )}
          </div>
          <p className={styles.etymTexte}>
            {perso
              ? perso.texte
              : infoPrenom
                ? infoPrenom.texte
                : "Votre prénom est peut-être rare dans nos archives, mais les personnes qui sortent des sentiers battus sont souvent celles qui marquent leur époque."
            }
          </p>
        </div>

        {/* Encouragement aléatoire */}
        <div className={`${styles.card} ${styles.cardEncourage} animate-fadeUp delay-2`}>
          <div className={styles.cardIconWrap}>
            <span className={styles.cardIcon}>💪</span>
            <span className={styles.cardLabel}>Un mot avant de commencer</span>
          </div>
          <p className={styles.encourageTexte}>« {encouragement} »</p>
        </div>

        {/* Bouton unique */}
        <div className={`${styles.actionWrap} animate-fadeUp delay-3`}>
          <button className={`btn-primary ${styles.btnLancer}`} onClick={lancerQuiz}>
            Commencer le quiz →
          </button>
        </div>

      </div>
    </div>
  );
}
