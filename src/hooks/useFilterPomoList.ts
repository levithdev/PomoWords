import { useState, useEffect } from "react"
import type { Pomo } from "../types/Pomo"
import type { FilterType } from "../types/FilterType"
import { subDays, isAfter } from "date-fns";

export function useFilterPomoList(pomoList: Pomo[]) {
  const [filterPomoList, setFilterPomoList] = useState<Pomo[]>(pomoList)
  const [filterType, setFilterType] = useState<FilterType>("7days")

  useEffect(() => {
    if (filterType === "all") {
      setFilterPomoList(pomoList)
    } else if (filterType === "7days") {
      const sevenDaysAgo = subDays(new Date(), 7)
      setFilterPomoList(pomoList.filter(p => isAfter(new Date(p.time), sevenDaysAgo)))
    }
  }, [pomoList, filterType]) // re-filtra sempre que a lista ou o filtro mudar

  return {
    filterPomoList,
    filterType,
    setFilterType, // o componente só precisa chamar isso pra trocar o filtro
  }
}