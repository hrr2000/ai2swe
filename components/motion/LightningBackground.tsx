"use client";

import { useEffect, useState } from "react";
import styles from "./Lightning.module.css";

export default function LightningBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.lightningContainer} aria-hidden="true">
      <div className={styles.glowOverlay} />
      
      {/* Animated Light Beams/Lightning */}
      <svg className={styles.lightningSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          className={styles.beamPath}
          d="M 20,0 L 40,40 L 30,50 L 60,100"
        />
        <path
          className={styles.beamPath2}
          d="M 80,0 L 60,30 L 70,60 L 40,100"
        />
        <path
          className={styles.beamPath3}
          d="M 50,0 L 70,50 L 40,80 L 80,100"
        />
      </svg>
      
      <div className={styles.ambientGlow1} />
      <div className={styles.ambientGlow2} />
    </div>
  );
}
