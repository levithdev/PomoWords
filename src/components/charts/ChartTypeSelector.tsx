import type { ChartType } from "../../types/ChartType"

interface ChartTypeSelectorProps {
  setChart: React.Dispatch<React.SetStateAction<ChartType>>
}

export function ChartTypeSelector({ setChart }: ChartTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setChart("gap-hour")}>Gap / Hour</button>
      <button onClick={() => setChart("gap-day")}>Gap / Day</button>
      <button onClick={() => setChart("pomo-day")}>Pomodoros / Day</button>
      <button onClick={() => setChart("heatmap")}>Heatmap</button>
    </div>
  )
}