"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./InlineAssistant.module.css";

interface SelectionData {
  text: string;
  x: number;
  y: number;
}

export default function InlineAssistant() {
  const [selection, setSelection] = useState<SelectionData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const activeSelection = window.getSelection();
      if (!activeSelection || activeSelection.isCollapsed) {
        // Prevent hiding if clicking inside the popup
        return;
      }

      const text = activeSelection.toString().trim();
      if (text.length > 10) {
        const range = activeSelection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelection({
          text,
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY - 10,
        });
        setResult(null);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (popupRef.current && popupRef.current.contains(e.target as Node)) {
        return;
      }
      setSelection(null);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleAction = async (action: "simplify" | "code") => {
    if (!selection) return;
    setIsProcessing(true);
    
    try {
      // Typically this would call an API route /api/ai/inline
      // Simulating a fast response for the invisible UI requirement
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      if (action === "simplify") {
        setResult("Here is a simplified version of the text you selected. It removes jargon and uses everyday analogies.");
      } else {
        setResult("This code snippet acts like a standard function call where inputs are processed sequentially.");
      }
    } catch (e) {
      setResult("Failed to process your request.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selection) return null;

  return (
    <div 
      ref={popupRef}
      className={styles.assistant}
      style={{ left: selection.x, top: selection.y }}
    >
      {!result ? (
        <div className={styles.actions}>
          <button 
            className={styles.actionBtn} 
            onClick={() => handleAction("simplify")}
            disabled={isProcessing}
          >
            {isProcessing ? "..." : "Simplify"}
          </button>
          <div className={styles.divider} />
          <button 
            className={styles.actionBtn} 
            onClick={() => handleAction("code")}
            disabled={isProcessing}
          >
            {isProcessing ? "..." : "Explain Code"}
          </button>
        </div>
      ) : (
        <div className={styles.result}>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
