import { useState } from "react";
import { countWords } from "../util/countWords";

export function usePomoStats(
  afterText: string,
  beforeText: string,
) {
  const [difference, setDifference] = useState<number | null>(null);

  const calculateDifference = () => {
    const gap = countWords(afterText) - countWords(beforeText);
    setDifference(gap);
  };

  return {
    difference,
    calculateDifference,
  }
}