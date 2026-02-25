import type { Pomo } from "../types/Pomo"

export interface StatsOverviewProps {
  data: {
    pomoList: Pomo[]
    totalGap: number | null
  }
  actions: {
    deleteHistory: () => void
  }
}

export function StatsOverview({
  data,
  actions
}: StatsOverviewProps) {

  const { pomoList, totalGap } = data
  const { deleteHistory } = actions


  return (
    <div>
      <div>
        {pomoList.length !== 0 && (
          <button onClick={deleteHistory}>Clear History</button>)}
      </div>
      <div>
        <p>{totalGap}</p>
      </div>
    </div>
  )
}