import { useState } from "react"

function App() {
  const [beforeText, setBeforeText] = useState("");
  const [afterText, setAfterText] = useState("");
  const [difference, setDifference] = useState<number | null>(null);

  const countWords = (text: string): number => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  };

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
        <button onClick={calculateDifference}>
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