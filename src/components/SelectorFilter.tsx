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
    <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(139,92,246,0.15)" }}>
      <select
        onChange={handleChange}
        style={{
          background: "#13102A",
          border: "1px solid rgba(139,92,246,0.20)",
          borderRadius: 6,
          color: "#A78BFA",
          fontSize: 12,
          padding: "4px 8px",
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="7days">last 7 days</option>
        <option value="all">all</option>
        <option value="morning">morning (6h–12h)</option>
        <option value="afternoon">afternoon (12h–18h)</option>
        <option value="night">night (18h–24h)</option>
      </select>
    </div>
  )
}