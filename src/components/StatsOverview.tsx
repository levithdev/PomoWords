import type { Pomo } from "../types/Pomo"

export interface StatsOverviewProps {
  data: {
    pomoList: Pomo[]
  }
  actions: {
    deleteHistory: () => void
  }
}

export function StatsOverview({ data, actions }: StatsOverviewProps) {
  const { pomoList } = data
  const { deleteHistory } = actions

  return (
    <div>
      {pomoList.length !== 0 && (
        <button
          onClick={deleteHistory}
          style={{
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: 8,
            color: "#F87171",
            fontSize: 13,
            fontWeight: 500,
            padding: "8px 16px",
            cursor: "pointer",
            minWidth: 64,
            minHeight: 40,
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Clear History
        </button>
      )}
    </div>
  )
}