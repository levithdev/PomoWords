import { useState } from "react"
import type { Pomo } from "../../types/Pomo"
import { ChartTypeSelector } from "./ChartTypeSelector"
import type { ChartType } from "../../types/ChartType"
import { AverageGapByHourChart } from "./AverageGapByHourChart"
import { AverageGapByDayChart } from "./AverageGapByDayChart"
import { AveragePomodorosByDayChart } from "./AveragePomodorosByDayChart"
import { HeatmapChart } from "./HeatmapChart"


interface OverviewChartProps {
  data: Pomo[]
}

export function OverviewChart({ data }: OverviewChartProps) {
  const [chartType, setChartType] = useState<ChartType>("gap-hour")
  const charts = {
    "gap-hour": <AverageGapByHourChart data={data} />,
    "gap-day": <AverageGapByDayChart data={data} />,
    "pomo-day": <AveragePomodorosByDayChart data={data} />,
    heatmap: <HeatmapChart data={data} />,
  }

  return (
    <div className="flex">
      <div className="w-[20%]">
        <ChartTypeSelector setChart={setChartType} />
      </div>
      <div>
        {charts[chartType] ?? null}
      </div>
    </div>
  )
}