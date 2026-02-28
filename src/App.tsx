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

function App() {
  const [beforeText, setBeforeText] = useState("");
  const [afterText, setAfterText] = useState("");

  const {
    pomoList,
    editingTime,
    newName,
    setNewName,
    setPomoList,
    setEditingTime,
    savePomo,
    deleteSession,
    deleteHistory,
    rename,
    taskInEdit,
  } = usePomoList();

  const {
    importJSON,
    exportJSON
  } = useImportExportJson(pomoList, setPomoList);

  const {
    totalGap,
    averageWordGap,
    difference,
    calculateAverageGap,
    calculateDifference
  } = usePomoStats(pomoList, afterText, beforeText);


  const pomoVerification = () => {
    if (pomoList.length === 0) {
      savePomo(beforeText, afterText)
      return
    }

    const lastPomo = pomoList[pomoList.length - 1];

    const isEqual =
      beforeText === lastPomo.beforeText &&
      afterText === lastPomo.afterText;

    if (isEqual) return;

    savePomo(beforeText, afterText);
  }

  const handleEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    callback: () => void
  ) => {
    if (event.key === "Enter") {
      callback()
    }
  }
  return (
    <div>
      <div>
        <div>
          <InputPomodoro
            text={beforeText}
            onChange={setBeforeText}
          />
        </div>
        <div>
          <p>Words: {countWords(beforeText)}</p>
        </div>
      </div>

      <div>
        <div>
          <InputPomodoro
            text={afterText}
            onChange={setAfterText}
          />
        </div>
        <div>
          <p>Words: {countWords(afterText)}</p>
        </div>
      </div>

      <div>
        <ButtonCalculateDiferrence
          onCalculateDifference={calculateDifference}
          onPomoVerification={pomoVerification}
          difference={difference}
        />
      </div>
      <div>
        <div>
          <SessionList
            data={{
              pomoList,
              editingTime,
              newName
            }}
            actions={{
              setNewName,
              deleteSession,
              rename,
              taskInEdit,
              setEditingTime,
              handleEnter,
              countWords
            }}
          />
        </div>
        <div>
          <StatsOverview
            data={{
              pomoList,
              totalGap
            }}
            actions={{
              deleteHistory
            }}
          />
        </div>
      </div>
      <div>
        <ImportExportJson
          actions={{
            exportJSON,
            importJSON
          }}
        />
      </div>
      <div>
        <button
          onClick={calculateAverageGap}
        >
          average gap calcation
        </button>
        {averageWordGap}
      </div>
    </div>
  );
}

export default App;
