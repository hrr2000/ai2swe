"use client";

import { useState } from "react";
import styles from "./page.module.css";

interface Props {
  sidebarContent: React.ReactNode;
  children: React.ReactNode;
}

export default function TutorialClientLayout({ sidebarContent, children }: Props) {
  const [isZenMode, setIsZenMode] = useState(false);

  return (
    <div className={`${styles.layout} ${isZenMode ? styles.zenMode : ""}`}>
      {/* Sidebar hidden in Zen Mode via CSS */}
      <div className={styles.sidebarWrapper}>
        {sidebarContent}
      </div>

      <article className={styles.article}>
        {children}
        
        {/* Zen Mode Toggle */}
        <button 
          className={styles.zenToggle}
          onClick={() => setIsZenMode(!isZenMode)}
          aria-label="Toggle Zen Mode"
          title={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
        >
          {isZenMode ? "Exit Zen Mode" : "Zen Mode"}
        </button>
      </article>
    </div>
  );
}
