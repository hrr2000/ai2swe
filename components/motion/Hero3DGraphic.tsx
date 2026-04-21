"use client";

import styles from "./Hero3DGraphic.module.css";
import { useEffect, useState, useRef } from "react";

export default function Hero3DGraphic() {
  const [rotation, setRotation] = useState({ x: -10, y: 25 });
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: -10, y: 25 });
  const autoRotateAngle = useRef(0);
  const isHovered = useRef(false);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (!isDragging.current && !isHovered.current) {
        autoRotateAngle.current += 0.005;
        // Apply a gentle sway based on time when not interacted with
        manualRotation.current = {
          x: Math.sin(autoRotateAngle.current) * 15 - 10,
          y: Math.cos(autoRotateAngle.current) * 20 + 25,
        };
        setRotation({ ...manualRotation.current });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
    // @ts-ignore
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    isHovered.current = true;
    if (!isDragging.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    manualRotation.current = {
      x: manualRotation.current.x - deltaY * 0.5,
      y: manualRotation.current.y + deltaX * 0.5,
    };

    setRotation({ ...manualRotation.current });
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    // @ts-ignore
    e.target.releasePointerCapture(e.pointerId);
  };

  const handlePointerLeave = () => {
    isDragging.current = false;
    isHovered.current = false;
  };

  return (
    <div 
      className={styles.scene}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className={styles.cube}
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <div className={`${styles.face} ${styles.front}`}>
          <span className={styles.term}>LLMs</span>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <span className={styles.term}>Transformers</span>
        </div>
        <div className={`${styles.face} ${styles.right}`}>
          <div className={styles.neuralNet}>
            <div className={styles.node} />
            <div className={styles.edge} />
            <div className={styles.node} />
            <div className={styles.edge} />
            <div className={styles.node} />
          </div>
        </div>
        <div className={`${styles.face} ${styles.left}`}>
          <span className={styles.term}>Embeddings</span>
        </div>
        <div className={`${styles.face} ${styles.top}`}>
          <span className={styles.term}>Eval Harness</span>
        </div>
        <div className={`${styles.face} ${styles.bottom}`}>
          <span className={styles.term}>LoRA</span>
        </div>
      </div>
      <div className={styles.shadow}></div>
    </div>
  );
}
