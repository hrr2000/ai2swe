import styles from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | ai2swe",
};

export default function AdminEditorPage() {
  return (
    <div className={styles.editorLayout}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.systemStatus}>System Online</span>
        </div>
        <nav className={styles.fileTree}>
          <div className={styles.treeGroup}>
            <span className={styles.groupLbl}>CONTENT</span>
            <button className={styles.treeItemActive}>ai-is-just-software.mdx</button>
            <button className={styles.treeItem}>what-is-a-neuron.mdx</button>
            <button className={styles.treeItem}>what-are-embeddings.mdx</button>
          </div>
          <div className={styles.treeGroup}>
            <span className={styles.groupLbl}>BLOG</span>
            <button className={styles.treeItem}>gpt-4o-guide.mdx</button>
          </div>
        </nav>
      </div>
      
      <div className={styles.editorPane}>
        <div className={styles.paneHeader}>
          <div className={styles.tabs}>
            <div className={styles.tabActive}>ai-is-just-software.mdx</div>
          </div>
          <div className={styles.paneActions}>
            <button className={styles.iconBtn}>Scrape Data</button>
            <button className={styles.primaryBtn}>Save File</button>
          </div>
        </div>
        <textarea
          className={styles.editorInput}
          defaultValue={`---\ntitle: "AI is Just Software"\n---\n\nUnderstanding AI doesn't require knowing multivariable calculus.`}
          spellCheck={false}
        />
      </div>

      <div className={styles.previewPane}>
        <div className={styles.paneHeader}>
          <div className={styles.tabs}>
            <div className={styles.tabActive}>Live Preview</div>
          </div>
        </div>
        <div className={styles.previewContent}>
          <div className="prose">
            <h1>AI is Just Software</h1>
            <p>Understanding AI doesn't require knowing multivariable calculus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
