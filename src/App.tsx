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
    <div className="h-screen w-screen grid grid-rows-[1fr_auto]">
      <div className="grid grid-cols-2 h-full">
        <div className="h-screen flex flex-col">
          <div className="grid flex-1 grid-cols-2">
            <div className="flex flex-col p-4">
              <InputPomodoro text={beforeText} onChange={setBeforeText} />
              <p className="border border-black border-t-0">Words: {countWords(beforeText)}</p>
            </div>
            <div className="flex flex-col p-4">
              <InputPomodoro text={afterText} onChange={setAfterText} />
              <p className="border border-black border-t-0">Words: {countWords(afterText)}</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex m-5">
              <ButtonCalculateDiferrence
                onCalculateDifference={calculateDifference}
                onPomoVerification={pomoVerification}
                difference={difference}
              />
            </div>
            <div className="flex m-5">
              <StatsOverview
                data={{ pomoList }}
                actions={{ deleteHistory }}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <SelectorFilter actions={{ setFilterType }} />
          </div>
          <div>
            <SessionList
              data={{ filterPomoList, editingId, newName }}
              actions={{ setNewName, deleteSession, rename, taskInEdit, setEditingId, handleEnter, countWords }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <ImportExportJson actions={{ exportJSON, importJSON }} />
        </div>
      </div>
    </div>
  )
}

export default App