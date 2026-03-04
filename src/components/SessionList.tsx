import type { Pomo } from "../types/Pomo"

export interface SessionListProps {
  data: {
    pomoList: Pomo[]
    editingTime: number | null
    newName: string
  }
  actions: {
    setNewName: React.Dispatch<React.SetStateAction<string>>
    deleteSession: (time: number) => void
    rename: (time: number) => void
    taskInEdit: (time: number) => void
    setEditingTime: React.Dispatch<React.SetStateAction<number | null>>
    handleEnter: (
      event: React.KeyboardEvent<HTMLInputElement>,
      callback: () => void
    ) => void
    countWords: (text: string) => number
  }
}
const getGapColor = (gap: number) => {
  if (gap < 0) return "text-red-600"
  if (gap === 0) return "text-gray-600"
  return "text-green-950"
}
export function SessionList({
  data,
  actions
}: SessionListProps) {

  const { pomoList, editingTime, newName } = data
  const {
    setNewName,
    deleteSession,
    rename,
    taskInEdit,
    setEditingTime,
    handleEnter,
    countWords
  } = actions

  return (
    <div>
      <ul>
        {pomoList.map((pomo) => (
          <li key={pomo.time} >
            <div className="bg-slate-500 border border-black m-4 rounded-lg flex flex-col justify-between">
              <div className="flex justify-between items-center">
                {editingTime === pomo.time ? (
                  <input
                    className=""
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) =>
                      handleEnter(e, () => {
                        rename(pomo.time)
                        setEditingTime(null)
                        setNewName("")
                      })
                    }
                  />
                ) : (
                  <h3
                    className="text-  xl font-bold"
                    onClick={() => taskInEdit(pomo.time)}> {pomo.name}</h3>
                )}
                <div className="flex flex-col ">
                  <p className="flex justify-end text-sm">
                    {new Date(pomo.time).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>


                </div>

              </div>
              <div>
                <p>Before: {countWords(pomo.beforeText)}</p>
                <p>After: {countWords(pomo.afterText)}</p>
                <p className={getGapColor(pomo.wordGap)}>{pomo.wordGap}</p>
              </div>
              <div className="flex justify-end ">
                <button
                  className=""
                  onClick={() => deleteSession(pomo.time)}>
                  delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div >
  )
}