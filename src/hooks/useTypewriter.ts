import { useEffect, useState } from "react";

export function useTypewriter(words: string[], typingMs = 70, pauseMs = 1400, deletingMs = 40) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), typingMs);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseMs);
      return () => clearTimeout(t);
    }

    if (text.length > 0) {
      const t = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingMs);
      return () => clearTimeout(t);
    }
    setPhase("typing");
    setWordIndex((i) => (i + 1) % words.length);
  }, [text, phase, wordIndex, words, typingMs, pauseMs, deletingMs]);

  return text;
}
