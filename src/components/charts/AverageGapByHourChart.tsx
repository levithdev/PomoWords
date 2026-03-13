import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from "recharts"
import type { Pomo } from "../../types/Pomo"

interface AverageGapByHourChartProps {
  data: Pomo[]
}

function buildHourlyData(data: Pomo[]) {
  const groups: Record<number, number[]> = {}
  for (let h = 0; h < 24; h++) groups[h] = []

  data.forEach((p) => {
    const hour = new Date(p.time).getHours()
    groups[hour].push(p.wordGap)
  })

  return Array.from({ length: 24 }, (_, h) => {
    const values = groups[h]
    const avg = values.length
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : null
    return { hour: h, avg, count: values.length }
  })
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
      <p style={{ color: "#B5D4F4", margin: "0 0 2px" }}>{`${label}:00 – ${label}:59`}</p>
      <p style={{ color: "#fff", margin: 0, fontWeight: 500 }}>
        {payload[0].value !== null ? `${payload[0].value} words` : "no data"}
      </p>
    </div>
  )
}

export function AverageGapByHourChart({ data }: AverageGapByHourChartProps) {
  const chartData = buildHourlyData(data)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(55,138,221,0.60)" />
        <XAxis
          dataKey="hour"
          tickFormatter={(h) => `${h}h`}
          tick={{ fontSize: 11, fill: "#888780" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#888780" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#378ADD"
          strokeWidth={2}
          dot={(props) => {
            const { cx, cy, payload } = props
            if (payload.count === 0) return <circle key={`dot-${cx}`} r={0} />
            return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={4} fill="#378ADD" stroke="#E6F1FB" strokeWidth={2} />
          }}
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}