import { useEffect, useState } from "react"
import type { Pomo } from "../types/Pomo"
import { countWords } from "../util/countWords";
import { useFilterPomoList } from "./useFilterPomoList"

export function usePomoList() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newName, setNewName] = useState("")
  const [pomoList, setPomoList] = useState<Pomo[]>(() => {
    const saved = localStorage.getItem("memory");
    return saved ? JSON.parse(saved) : [];
  });

  const filter = useFilterPomoList(pomoList)

  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(pomoList))
  }, [pomoList])

  const savePomo = (afterText: string, beforeText: string) => {
    const gap = countWords(afterText) - countWords(beforeText);
    const newPomo: Pomo = {
      name: "Session " + (pomoList.length + 1),
      beforeText,
      afterText,
      wordGap: gap,
      time: Date.now(),
      id: crypto.randomUUID()
    };
    setPomoList((prev) => [...prev, newPomo])
  }

  const deleteSession = (id: string) => {
    setPomoList(prev => prev.filter(p => p.id !== id))
  };

  const deleteHistory = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all sessions?")
    if (confirmDelete) setPomoList([])
  }

  const rename = (id: string) => {
    setPomoList(prev =>
      prev.map(pomo => pomo.id === id ? { ...pomo, name: newName } : pomo)
    )
  }

  const taskInEdit = (id: string) => setEditingId(id)

  return {
    pomoList,
    editingId,
    newName,
    ...filter,
    setPomoList,
    setNewName,
    setEditingId,
    savePomo,
    deleteSession,
    deleteHistory,
    rename,
    taskInEdit,
  };
}