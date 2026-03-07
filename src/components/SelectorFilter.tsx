import type React from "react"
import type { Pomo } from "../types/Pomo"

export interface SelectorFilterProps {
  date: {
    pomoList: Pomo[]
  }
  actions: {
    setFilterPomoList: React.Dispatch<React.SetStateAction<Pomo[]>>
    filterSevenDays: () => Pomo[]
  }
}


export function SelectorFilter({
  date,
  actions,
}: SelectorFilterProps) {

  const { pomoList } = date
  const { setFilterPomoList, filterSevenDays } = actions


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    if (value === "7days") {
      setFilterPomoList(filterSevenDays())
    }
    if (value === "all") {
      setFilterPomoList(pomoList)
    }
  }
  return (
    <div>
      <select onChange={handleChange}
        className="border border-black justify-self-center"
      >
        <option value="all">all</option>
        <option value="7days">last 7 days</option>
      </select>
    </div>
  )
}