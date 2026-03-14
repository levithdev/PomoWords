import type { Pomo } from "../../types/Pomo"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"

interface AveragePomodorosByDayChartProps {
  data: Pomo[]
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function buildDailyPomoCount(data: Pomo[]) {
  const count: Record<number, number> = {}
  for (let d = 0; d < 7; d++) count[d] = 0

  data.forEach((p) => {
    const day = new Date(p.time).getDay()
    count[day]++
  })

  return Array.from({ length: 7 }, (_, d) => ({
    day: DAY_LABELS[d],
    pomos: count[d],
  }))
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "#0C447C",
      borderRadius: 6,
      padding: "8px 12px",
      fontSize: 12,
    }}>
      <p style={{ color: "#B5D4F4", margin: "0 0 2px" }}>{label}</p>
      <p style={{ color: "#fff", margin: 0, fontWeight: 500 }}>
        {payload[0].value === 1 ? "1 pomo" : `${payload[0].value} pomos`}
      </p>
    </div>
  )
}

export function AveragePomodorosByDayChart({ data }: AveragePomodorosByDayChartProps) {
  const chartData = buildDailyPomoCount(data)
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(55,138,221,0.60)" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11, fill: "#888780" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#888780" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(55,138,221,0.10)" }} />
        <Bar
          dataKey="pomos"
          fill="#378ADD"
          radius={[4, 4, 0, 0]}
          background={{ fill: "rgba(55,138,221,0.06)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}