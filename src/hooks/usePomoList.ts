import { useEffect, useState } from "react"
import type { Pomo } from "../types/Pomo"
import { countWords } from "../util/countWords";
import { subDays, isAfter } from "date-fns";
import type { FilterType } from "../types/FilterType"

export function usePomoList() {
  const [editingTime, setEditingTime] = useState<number | null>(null)
  const [newName, setNewName] = useState("")
  const [filterPomoList, setFilterPomoList] = useState<Pomo[]>([])
  const [filterType, setFilterType] = useState<FilterType>("all")
  const [pomoList, setPomoList] = useState<Pomo[]>(() => {
    const saved = localStorage.getItem("memory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(pomoList))
  }, [pomoList])
  useEffect(() => {
    setFilterPomoList(pomoList)
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
  const filterSevenDays = () => {
    const sevenDaysago = subDays(new Date(), 7)

    return pomoList.filter((p) =>
      isAfter(new Date(p.time), sevenDaysago)
    )
  }

  return {
    pomoList,
    editingTime,
    newName,
    filterPomoList,
    filterType,
    filterSevenDays,
    setPomoList,
    setNewName,
    setEditingTime,
    savePomo,
    deleteSession,
    deleteHistory,
    rename,
    taskInEdit,
    setFilterPomoList,
    setFilterType,

  };

}
