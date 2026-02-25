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
          <li key={pomo.time}>
            {editingTime === pomo.time ? (
              <input
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
              <h3 onClick={() => taskInEdit(pomo.time)}> {pomo.name}</h3>
            )}

            <div>
              <p>Before: {countWords(pomo.beforeText)}</p>
              <p>After: {countWords(pomo.afterText)}</p>
              <p>Gap: {pomo.wordGap}</p>
            </div>
            <p>
              {new Date(pomo.time).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <button onClick={() => deleteSession(pomo.time)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}