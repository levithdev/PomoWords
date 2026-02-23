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

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  };
  const savePomo = () => {
    const gap = countWords(beforeText) - countWords(afterText);
    const numberName = pomoList.length + 1; 
    
    const newPomo: Pomo = { 
      name: "Session" + numberName,
      beforeText,
      afterText, 
      wordGap: gap,
      time: Date.now()
    }; 
   setPomoList((prev) => [...prev, newPomo])
  }

  const calculateDifference = () => { 
    const gap = countWords(beforeText) - countWords(afterText);
    setDifference(gap);
  };

  const deleteHistory = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this session?")

    if (confirmDelete) {
      setPomoList([]) //delete 
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
          savePomo()
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
                  <h3>{pomo.name}</h3>
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
              </li>
           ))}
          </ul>
        </div>
        <div>
           { pomoList.length !== 0 && (
            <button onClick={deleteHistory}>Clear History</button>
           ) }
        </div>
      </div>
    </div>
  );
}

export default App;