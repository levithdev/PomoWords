import type { Pomo } from "../types/Pomo"
import { ChartTypeSelector } from "./ChartTypeSelector"
import { Chart } from "./Chart"

interface OverviewChartProps {
  data: Pomo[]
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <div>
      <Chart data={data} />
      <ChartTypeSelector />
    </div>
  )
}