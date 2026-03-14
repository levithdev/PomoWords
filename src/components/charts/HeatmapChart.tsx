import type { Pomo } from "../../types/Pomo"
import { useState } from "react"

interface HeatmapChartProps {
  data: Pomo[]
}

const WEEKS = 26
const CELL = 16
const GAP = 4
const DAY_LABEL_WIDTH = 22
const MONTH_ROW = 14
const WEEK_ROW = 14
const HEADER = MONTH_ROW + WEEK_ROW

const DAYS = ["S", "M", "T", "W", "T", "F", "S"]
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const COLORS = [
  "rgba(55,138,221,0.07)",
  "rgba(55,138,221,0.25)",
  "rgba(55,138,221,0.45)",
  "rgba(55,138,221,0.68)",
  "#378ADD",
]

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function getWeekOfYear(date: Date) {
  const jan1 = new Date(date.getFullYear(), 0, 1)
  return Math.ceil(((date.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
}

type DayEntry = { totalGap: number; pomos: number }
type HeatmapCell = { date: Date; score: number; pomos: number; avgGap: number; level: number }

function buildHeatmapData(data: Pomo[]) {
  const scoreByDay: Record<string, DayEntry> = {}
  data.forEach((p) => {
    const key = toDateKey(new Date(p.time))
    if (!scoreByDay[key]) scoreByDay[key] = { totalGap: 0, pomos: 0 }
    scoreByDay[key].totalGap += p.wordGap
    scoreByDay[key].pomos++
  })

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay() - (WEEKS - 1) * 7)

  const cells: HeatmapCell[] = []
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start)
      date.setDate(start.getDate() + w * 7 + d)
      const key = toDateKey(date)
      const entry = scoreByDay[key]
      const pomos = entry?.pomos ?? 0
      const avgGap = pomos > 0 ? entry.totalGap / pomos : 0
      const score = avgGap * 0.18 + pomos * 0.5
      cells.push({ date, score, pomos, avgGap: Math.round(avgGap), level: 0 })
    }
  }

  const maxScore = Math.max(...cells.map((c) => c.score), 1)
  return cells.map((c) => ({
    ...c,
    level: c.score === 0 ? 0 : Math.min(4, Math.ceil((c.score / maxScore) * 4)),
  }))
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

type TooltipState = { x: number; y: number; cell: HeatmapCell }

export function HeatmapChart({ data }: HeatmapChartProps) {
  const cells = buildHeatmapData(data)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayKey = toDateKey(today)

  const svgWidth = DAY_LABEL_WIDTH + WEEKS * (CELL + GAP)
  const svgHeight = HEADER + 7 * (CELL + GAP)

  const weekHeaders = Array.from({ length: WEEKS }, (_, w) => {
    const sunday = cells[w * 7].date
    const weekNum = getWeekOfYear(sunday)
    const month = sunday.getMonth()
    const prevMonth = w > 0 ? cells[(w - 1) * 7].date.getMonth() : -1
    return { weekNum, month, showMonth: month !== prevMonth }
  })

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={svgWidth} height={svgHeight} style={{ display: "block", overflow: "visible" }}>

        {/* Month + week number headers */}
        {weekHeaders.map((wh, w) => {
          const x = DAY_LABEL_WIDTH + w * (CELL + GAP)
          return (
            <g key={w}>
              {wh.showMonth && (
                <text x={x} y={MONTH_ROW - 2} fontSize={10} fill="#aaaaaa" fontFamily="inherit">
                  {MONTH_NAMES[wh.month]}
                </text>
              )}
              <text
                x={x + CELL / 2}
                y={HEADER - 2}
                fontSize={8}
                fill="#555555"
                fontFamily="inherit"
                textAnchor="middle"
              >
                {wh.weekNum}
              </text>
            </g>
          )
        })}

        {/* Day labels */}
        {DAYS.map((d, i) => (
          <text
            key={i}
            x={0}
            y={HEADER + i * (CELL + GAP) + CELL * 0.75}
            fontSize={9}
            fill="#888780"
            fontFamily="inherit"
          >
            {i % 2 !== 0 ? d : ""}
          </text>
        ))}

        {/* Cells */}
        {cells.map((cell, i) => {
          const w = Math.floor(i / 7)
          const d = i % 7
          const x = DAY_LABEL_WIDTH + w * (CELL + GAP)
          const y = HEADER + d * (CELL + GAP)
          const isToday = toDateKey(cell.date) === todayKey

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={CELL}
                height={CELL}
                rx={3}
                ry={3}
                fill={COLORS[cell.level]}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setTooltip({ x, y, cell })}
                onMouseLeave={() => setTooltip(null)}
              />
              {isToday && (
                <rect
                  x={x - 1.5}
                  y={y - 1.5}
                  width={CELL + 3}
                  height={CELL + 3}
                  rx={4}
                  ry={4}
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth={1.5}
                  style={{ pointerEvents: "none" }}
                />
              )}
            </g>
          )
        })}

        {/* Tooltip */}
        {tooltip && (() => {
          const BOX_W = 148
          const BOX_H = tooltip.cell.pomos > 0 ? 54 : 34
          const bx = Math.min(Math.max(tooltip.x - BOX_W / 2, 0), svgWidth - BOX_W)
          const by = tooltip.y - BOX_H - 6

          return (
            <g style={{ pointerEvents: "none" }}>
              <rect x={bx} y={by} width={BOX_W} height={BOX_H} rx={6} fill="#0C447C" />
              <text x={bx + 8} y={by + 14} fontSize={10} fill="#B5D4F4" fontFamily="inherit">
                {formatDate(tooltip.cell.date)}
              </text>
              {tooltip.cell.pomos > 0 ? (
                <>
                  <text x={bx + 8} y={by + 30} fontSize={10} fill="#fff" fontFamily="inherit" fontWeight="500">
                    {`${tooltip.cell.pomos} pomo${tooltip.cell.pomos > 1 ? "s" : ""} · avg ${tooltip.cell.avgGap} words`}
                  </text>
                  <text x={bx + 8} y={by + 46} fontSize={10} fill="#B5D4F4" fontFamily="inherit">
                    {`score: ${tooltip.cell.score.toFixed(1)}`}
                  </text>
                </>
              ) : (
                <text x={bx + 8} y={by + 28} fontSize={10} fill="#555" fontFamily="inherit">
                  no data
                </text>
              )}
            </g>
          )
        })()}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
        <span style={{ fontSize: 10, color: "#888780" }}>Less</span>
        {COLORS.map((color, i) => (
          <div key={i} style={{ width: CELL, height: CELL, borderRadius: 3, background: color }} />
        ))}
        <span style={{ fontSize: 10, color: "#888780" }}>More</span>
      </div>
    </div>
  )
}