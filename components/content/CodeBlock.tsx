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

  const lang = className?.replace("language-", "") ?? "";

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        {lang && <span className={styles.lang}>{lang}</span>}
        <button
          className={styles.copyBtn}
          onClick={copy}
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre ref={preRef} className={`${styles.pre} ${className ?? ""}`} {...props}>
        {children}
      </pre>
    </div>
  );
}
