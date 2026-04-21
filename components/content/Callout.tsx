import styles from "./Callout.module.css";

type CalloutType = "info" | "tip" | "warning" | "caution" | "insight" | "misconception";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<CalloutType, { label: string }> = {
  info:          { label: "Note" },
  tip:           { label: "Tip" },
  warning:       { label: "Warning" },
  caution:       { label: "Caution" },
  insight:       { label: "Key Insight" },
  misconception: { label: "Common Misconception" },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  return (
    <aside className={styles.callout} role="note">
      <div className={styles.header}>
        <span className={styles.label}>{title ?? config.label}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
