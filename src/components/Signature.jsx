import styles from './Signature.module.css';

export default function Signature() {
  return (
    <div className={styles.signature}>
      <div className={styles.photoWrap}>
        <img src="/photo-profil.jpeg" alt="Charif Hachichi" className={styles.photo} />
      </div>
      <div className={styles.info}>
        <span className={styles.nom}>Charif Hachichi</span>
        <a href="mailto:Charif.Hachichi@Egis-Group.com" className={styles.email}>
          Charif.Hachichi@Egis-Group.com
        </a>
      </div>
    </div>
  );
}
