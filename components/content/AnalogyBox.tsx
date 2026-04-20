import styles from "./AnalogyBox.module.css";

interface AnalogyBoxProps {
  code: string;
  ai: string;
}

export default function AnalogyBox({ code, ai }: AnalogyBoxProps) {
  return (
    <div className={styles.box}>
      <div className={styles.side}>
        <span className={styles.label}>
          <span className={styles.dot} data-side="code" />
          In Software
        </span>
        <p className={styles.text}>{code}</p>
      </div>
      <div className={styles.arrow}>→</div>
      <div className={styles.side}>
        <span className={styles.label}>
          <span className={styles.dot} data-side="ai" />
          In AI
        </span>
        <p className={styles.text}>{ai}</p>
      </div>
    </div>
  );
}
