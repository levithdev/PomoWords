import { useEffect, useState } from "react"
type Pomo = {
  name: string,
  beforeText: string,
  afterText: string,
  wordGap: number,
  time: number
}

function App() {
  const [beforeText, setBeforeText] = useState("");
  const [afterText, setAfterText] = useState("");
  const [difference, setDifference] = useState<number | null>(null);
  const [editingTime, setEditingTime] = useState<number |null>(null)
  const [newName, setNewName] = useState("")
  const [totalGap, setTotalGap] = useState<number |null>(null)
  const [pomoList, setPomoList] = useState<Pomo[]>(() => {
    try {
    const saved = localStorage.getItem("memory");
    return saved ? (JSON.parse(saved) as Pomo[]) : []; 
   } catch {
    return []
   }
  })

  useEffect(() => {
    localStorage.setItem("memory", JSON.stringify(pomoList))
  }, [pomoList])
  useEffect(() => {
    const gap = pomoList.reduce((acc, pomo) => acc + pomo.wordGap, 0 );
    setTotalGap(gap); 
  }, [pomoList])

  const exportJSON = () => {
    const jsonString = JSON.stringify(pomoList, null, 2);
    const blob = new Blob([jsonString], {type: "application/json"}); 
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dados.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result;

        if (typeof result !== "string") {
          throw new Error("Invalid file format");
        }

        const parsedData: Pomo[] = JSON.parse(result);

        if (!Array.isArray(parsedData)) {
          throw new Error("Invalid JSON structure");
        }

        setPomoList((prev) => [...prev, ...parsedData]);

      } catch {
        alert("ERROR! INVALID JSON FILE");
      }
    };

    reader.readAsText(file);
  };

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  };
  const savePomo = () => {
    const gap = countWords(afterText) - countWords(beforeText);
    const numberName = pomoList.length + 1; 
    
    const newPomo: Pomo = { 
      name: "Session " + numberName,
      beforeText,
      afterText, 
      wordGap: gap,
      time: Date.now()
    }; 
   setPomoList((prev) => [...prev, newPomo])
  }

  const pomoVerification = () => {
    if (pomoList.length === 0) {
      savePomo()
      return
    }

    const lastPomo = pomoList[pomoList.length - 1];

   const isEqual =
    beforeText === lastPomo.beforeText &&
    afterText === lastPomo.afterText;

  if (isEqual) return;

  savePomo();
  }

  const calculateDifference = () => { 
    const gap = countWords(afterText) - countWords(beforeText);
    setDifference(gap);
  };
  const deleteSession = (time: number) => {
    setPomoList(prev => prev.filter(p => p.time !== time ))
  };
  const taskInEdit = (time: number) => {
    setEditingTime(time) 
  }
  const rename = (time: number) => { 
    setPomoList(prev =>
       prev.map(pomo => 
        pomo.time === time 
        ? {...pomo, name: newName}
        : pomo 
    ))
  }

  const deleteHistory = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this session?")

    if (confirmDelete) {
      setPomoList([]) //delete 
    }
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
        <input
          type="text"
          value={beforeText}
          onChange={(e) => setBeforeText(e.target.value)}
        />

        <div>
          <p>Words: {countWords(beforeText)}</p>
        </div>
      </div>

      <div>
        <input 
          type="text"
          value={afterText}
          onChange={(e) => setAfterText(e.target.value)}
        />
        <p>Words: {countWords(afterText)}</p>
      </div>

      <div>
        <button onClick={() => {
          calculateDifference()
          pomoVerification() 
        }}>
          {difference === null ? (
            "Calculate difference"
          ) : (
            difference
          )}
        </button>
      </div>
      <div>
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
        <div>
           { pomoList.length !== 0 && (
            <button onClick={deleteHistory}>Clear History</button>
           ) }
        </div>
        <div>
          <p>{totalGap}</p>
        </div>
      </div>
      <div>
        <div>
          <button
          onClick={exportJSON}
          >
          Export JSON 
          </button>
        </div>
        <div>
          <input
            type="file"
            accept="application/json"
            onChange={importJSON}
          />
        </div>
      </div>
    </div>
  );
}

export default App;