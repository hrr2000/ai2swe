import styles from "./Callout.module.css";

type CalloutType = "info" | "tip" | "warning" | "caution" | "insight" | "misconception";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<CalloutType, { icon: string; label: string }> = {
  info:          { icon: "ℹ️", label: "Note" },
  tip:           { icon: "💡", label: "Tip" },
  warning:       { icon: "⚠️", label: "Warning" },
  caution:       { icon: "🚨", label: "Caution" },
  insight:       { icon: "🧠", label: "Key Insight" },
  misconception: { icon: "❌", label: "Common Misconception" },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  return (
    <aside className={`${styles.callout} ${styles[type]}`} role="note">
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden>{config.icon}</span>
        <span className={styles.label}>{title ?? config.label}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
