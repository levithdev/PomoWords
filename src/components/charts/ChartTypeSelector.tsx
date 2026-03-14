import { useState } from "react"
import type { ChartType } from "../../types/ChartType"

interface ChartTypeSelectorProps {
  setChart: React.Dispatch<React.SetStateAction<ChartType>>
}

const OPTIONS: { label: string; value: ChartType }[] = [
  { label: "Gap / Hour", value: "gap-hour" },
  { label: "Gap / Day", value: "gap-day" },
  { label: "Pomodoros / Day", value: "pomo-day" },
  { label: "Heatmap", value: "heatmap" },
]

export function ChartTypeSelector({ setChart }: ChartTypeSelectorProps) {
  const [active, setActive] = useState<ChartType>("gap-hour")

  const handleClick = (value: ChartType) => {
    setActive(value)
    setChart(value)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingRight: 12 }}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleClick(opt.value)}
          style={{
            background: active === opt.value ? "rgba(139,92,246,0.15)" : "transparent",
            border: "1px solid",
            borderColor: active === opt.value ? "rgba(139,92,246,0.45)" : "transparent",
            borderRadius: 6,
            color: active === opt.value ? "#C4B5FD" : "#4B4560",
            fontSize: 12,
            fontWeight: active === opt.value ? 500 : 400,
            padding: "6px 12px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            if (active !== opt.value) e.currentTarget.style.color = "#9D93B0"
          }}
          onMouseLeave={(e) => {
            if (active !== opt.value) e.currentTarget.style.color = "#4B4560"
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}