import type { Pomo } from "../types/Pomo"

export interface StatsOverviewProps {
  data: {
    pomoList: Pomo[]
  }
  actions: {
    deleteHistory: () => void
  }
}

export function StatsOverview({
  data,
  actions
}: StatsOverviewProps) {

  const { pomoList } = data
  const { deleteHistory } = actions


  return (
    <div>
      {pomoList.length !== 0 && (
        <button
          className="border border-black rounded-lg min-h-10 pr-2 pl-2 min-w-16"
          onClick={deleteHistory}>
          Clear History
        </button>)}
    </div>
  )
}