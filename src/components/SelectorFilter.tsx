import type React from "react"
import type { FilterType } from "../types/FilterType"

export interface SelectorFilterProps {
  actions: {
    setFilterType: React.Dispatch<React.SetStateAction<FilterType>>
  }
}

export function SelectorFilter({ actions }: SelectorFilterProps) {
  const { setFilterType } = actions

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as FilterType)
  }

  return (
    <div>
      <select onChange={handleChange} className="border border-black">
        <option value="7days">last 7 days</option>
        <option value="all">all</option>
      </select>
    </div>
  )
}