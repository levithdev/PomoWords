import { useEffect, useState } from "react"
import type { Pomo } from "../types/Pomo"
import { countWords } from "../util/countWords";

export function usePomoList() {
  const [editingTime, setEditingTime] = useState<number | null>(null)
  const [newName, setNewName] = useState("")
  const [pomoList, setPomoList] = useState<Pomo[]>(() => {
    const saved = localStorage.getItem("memory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(pomoList))
  }, [pomoList])

  const savePomo = (afterText: string, beforeText: string) => {
    const gap = countWords(afterText) - countWords(beforeText);
    const numberName = pomoList.length + 1;

    const newPomo: Pomo = {
      name: "Session " + numberName,
      beforeText,
      afterText,
      wordGap: gap,
      time: Date.now()
    };
    setPomoList((prev) => [...prev, newPomo])
  }

  const deleteSession = (time: number) => {
    setPomoList(prev => prev.filter(p => p.time !== time))
  };

  const deleteHistory = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this session?")

    if (confirmDelete) {
      setPomoList([]) //delete 
    }
  }

  const rename = (time: number) => {
    setPomoList(prev =>
      prev.map(pomo =>
        pomo.time === time
          ? { ...pomo, name: newName }
          : pomo
      ))
  }

  const taskInEdit = (time: number) => {
    setEditingTime(time)
  }

  return {
    pomoList,
    editingTime,
    newName,
    setPomoList,
    setNewName,
    setEditingTime,
    savePomo,
    deleteSession,
    deleteHistory,
    rename,
    taskInEdit,
  };

}
