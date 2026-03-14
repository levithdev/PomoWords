import type { Pomo } from "../types/Pomo"

export interface SessionListProps {
  data: {
    filterPomoList: Pomo[]
    editingId: string | null
    newName: string
  }
  actions: {
    setNewName: React.Dispatch<React.SetStateAction<string>>
    deleteSession: (id: string) => void
    rename: (id: string) => void
    taskInEdit: (id: string) => void
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>
    handleEnter: (
      event: React.KeyboardEvent<HTMLInputElement>,
      callback: () => void
    ) => void
    countWords: (text: string) => number
  }
}

const getGapColor = (gap: number) => {
  if (gap < 0) return "#FDA4AF"
  if (gap === 0) return "#4B4560"
  return "#86EFAC"
}

export function SessionList({ data, actions }: SessionListProps) {
  const { filterPomoList, editingId, newName } = data
  const { setNewName, deleteSession, rename, taskInEdit, setEditingId, handleEnter, countWords } = actions

  return (
    <div style={{ padding: "8px 16px 8px 12px" }}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {filterPomoList.map((pomo) => (
          <li key={pomo.id}>
            <div
              style={{
                background: "#13102A",
                border: "1px solid rgba(139,92,246,0.18)",
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.18)")}
            >
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {editingId === pomo.id ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) =>
                      handleEnter(e, () => {
                        rename(pomo.id)
                        setEditingId(null)
                        setNewName("")
                      })
                    }
                    style={{
                      background: "#1E1A35",
                      border: "1px solid rgba(139,92,246,0.40)",
                      borderRadius: 6,
                      color: "#E2DCF7",
                      fontSize: 13,
                      padding: "4px 8px",
                      outline: "none",
                    }}
                  />
                ) : (
                  <h3
                    onClick={() => taskInEdit(pomo.id)}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#C4B5FD",
                      cursor: "pointer",
                      margin: 0,
                    }}
                  >
                    {pomo.name}
                  </h3>
                )}
                <span style={{ fontSize: 11, color: "#4B4560" }}>
                  {new Date(pomo.time).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#6B6880" }}>
                  Before: <span style={{ color: "#9D93B0" }}>{countWords(pomo.beforeText)}</span>
                </span>
                <span style={{ fontSize: 12, color: "#6B6880" }}>
                  After: <span style={{ color: "#9D93B0" }}>{countWords(pomo.afterText)}</span>
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: getGapColor(pomo.wordGap), marginLeft: "auto" }}>
                  {pomo.wordGap > 0 ? `+${pomo.wordGap}` : pomo.wordGap}
                </span>
              </div>

              {/* Delete row */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => deleteSession(pomo.id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#3D3555",
                    fontSize: 11,
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F87171")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#3D3555")}
                >
                  delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}