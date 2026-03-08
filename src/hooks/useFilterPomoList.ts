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
    } else if (filterType === "morning") {
      setFilterPomoList(pomoList.filter(p => {
        const hour = new Date(p.time).getHours()
        return hour >= 6 && hour < 12
      }))
    } else if (filterType === "afternoon") {
      setFilterPomoList(pomoList.filter(p => {
        const hour = new Date(p.time).getHours()
        return hour >= 12 && hour < 18
      }))
    } else if (filterType === "night") {
      setFilterPomoList(pomoList.filter(p => {
        const hour = new Date(p.time).getHours()
        return hour >= 18 && hour < 24
      }))
    }
  }, [pomoList, filterType])

  return {
    filterPomoList,
    filterType,
    setFilterType,
  }
}