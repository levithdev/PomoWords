import { useState } from "react"
type pomo = {
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
  const [pomoList, setPomoList] = useState<pomo[]>([])
  

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  };
  const savePomo = () => {
    const gap = countWords(beforeText) - countWords(afterText);
    const numberName = pomoList.length + 1; 
    
    const newPomo: pomo = { 
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
    </div>
  );
}

export default App;