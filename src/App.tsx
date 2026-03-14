import { InputPomodoro } from "./components/InputPomodoro"
import { ButtonCalculateDiferrence } from "./components/ButtonCalculeteDiferrence"
import { SessionList } from "./components/SessionList"
import { StatsOverview } from "./components/StatsOverview"
import { ImportExportJson } from "./components/ImportExportJson"
import { usePomoList } from "./hooks/usePomoList"
import { countWords } from "./util/countWords"
import { useImportExportJson } from "./hooks/useImportExportJson"
import { usePomoStats } from "./hooks/usePomoStats"
import { useState } from "react"
import { SelectorFilter } from "./components/SelectorFilter"
import { OverviewChart } from "./components/charts/OverviewChart"

function App() {
  const [beforeText, setBeforeText] = useState("")
  const [afterText, setAfterText] = useState("")
  const {
    pomoList,
    filterPomoList,
    editingId,
    newName,
    setPomoList,
    setNewName,
    setEditingId,
    savePomo,
    deleteSession,
    deleteHistory,
    rename,
    taskInEdit,
    setFilterType,
  } = usePomoList()
  const { importJSON, exportJSON } = useImportExportJson(pomoList, setPomoList)
  const { difference, calculateDifference } = usePomoStats(pomoList, afterText, beforeText)

  const pomoVerification = () => {
    if (afterText.trim().length === 0) return
    if (pomoList.length === 0) {
      savePomo(afterText, beforeText)
      return
    }
    const lastPomo = pomoList[pomoList.length - 1]
    const isEqual = beforeText === lastPomo.beforeText && afterText === lastPomo.afterText
    if (isEqual) return
    savePomo(afterText, beforeText)
  }

  const handleEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) => {
    if (event.key === "Enter") callback()
  }

  return (
    <div className="w-screen overflow-y-auto" style={{ background: "#0E0A1F", minHeight: "100vh" }}>

      <div className="h-screen flex flex-col">
        <div className="grid grid-cols-2 flex-1 overflow-hidden">

          {/* Left */}
          <div className="flex flex-col" style={{ borderRight: "1px solid rgba(139,92,246,0.15)" }}>
            <div className="grid flex-1 grid-cols-2">
              <div className="flex flex-col p-4">
                <InputPomodoro text={beforeText} onChange={setBeforeText} />
                <p style={{ fontSize: 11, color: "#6B6880", marginTop: 4 }}>
                  Words: {countWords(beforeText)}
                </p>
              </div>
              <div className="flex flex-col p-4" style={{ borderLeft: "1px solid rgba(139,92,246,0.15)" }}>
                <InputPomodoro text={afterText} onChange={setAfterText} />
                <p style={{ fontSize: 11, color: "#6B6880", marginTop: 4 }}>
                  Words: {countWords(afterText)}
                </p>
              </div>
            </div>

            <div
              className="flex justify-center items-center gap-4 py-4"
              style={{ borderTop: "1px solid rgba(139,92,246,0.15)" }}
            >
              <ButtonCalculateDiferrence
                onCalculateDifference={calculateDifference}
                onPomoVerification={pomoVerification}
                difference={difference}
              />
              <StatsOverview data={{ pomoList }} actions={{ deleteHistory }} />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col h-full overflow-hidden">
            <SelectorFilter actions={{ setFilterType }} />
            <div className="overflow-y-auto flex-1">
              <SessionList
                data={{ filterPomoList, editingId, newName }}
                actions={{ setNewName, deleteSession, rename, taskInEdit, setEditingId, handleEnter, countWords }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Charts */}
      <div
        className="w-full px-8"
        style={{ paddingTop: 64, paddingBottom: 48, borderTop: "1px solid rgba(139,92,246,0.15)" }}
      >
        <OverviewChart data={filterPomoList} />
      </div>

      {/* Import/Export */}
      <div
        className="flex justify-end px-8 pb-6"
        style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}
      >
        <details>
          <summary style={{ fontSize: 11, color: "#4B4560", cursor: "pointer", userSelect: "none" }}>
            data
          </summary>
          <div className="pt-2">
            <ImportExportJson actions={{ exportJSON, importJSON }} />
          </div>
        </details>
      </div>

    </div>
  )
}

export default App