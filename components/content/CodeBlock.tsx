"use client";

import { useState, useRef } from "react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copy = async () => {
    const text = preRef.current?.textContent ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract language from className like "language-typescript"
  const lang = className?.replace("language-", "") ?? "";

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.dots} aria-hidden>
          <span /><span /><span />
        </div>
        {lang && <span className={styles.lang}>{lang}</span>}
        <button
          className={styles.copyBtn}
          onClick={copy}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre ref={preRef} className={`${styles.pre} ${className ?? ""}`} {...props}>
        {children}
      </pre>
    </div>
  );
}
