import { useState, useEffect } from "react";
import { countWords } from "../util/countWords";
import type { Pomo } from "../types/Pomo";

export function usePomoStats(
  pomoList: Pomo[],
  afterText: string,
  beforeText: string,
) {
  const [totalGap, setTotalGap] = useState<number | null>(null);
  const [averageWordGap, setAverageWordGap] = useState<number | null>(null);
  const [difference, setDifference] = useState<number | null>(null);

  useEffect(() => {
    const gap = pomoList.reduce((acc, pomo) => acc + pomo.wordGap, 0);
    setTotalGap(gap);
  }, [pomoList])


  const calculateAverageGap = () => {
    let average = 0;
    pomoList.map((item) => {
      average = average + item.wordGap
    })
    if (pomoList.length === 0) return

    average = average / pomoList.length
    average = Number(average.toFixed(1))
    setAverageWordGap(average)
  }
  const calculateDifference = () => {
    const gap = countWords(afterText) - countWords(beforeText);
    setDifference(gap);
  };

  return {
    totalGap,
    averageWordGap,
    difference,
    calculateAverageGap,
    calculateDifference,
  }
}