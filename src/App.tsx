import { useState } from "react"

function App() {
    const [beforeText, setBeforeText] = useState("");
    const [afterText, setAfterText] = useState("");

  const countWords = (text :string): number => {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
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
          <p>palavras: {countWords(beforeText)}</p>
         </div>
      </div>
      <div>
        <input 
        type="text"
        value={afterText}
        onChange={(e) => setAfterText(e.target.value)}
        />
        <p>palavras: {countWords(afterText)}</p>
      </div>
    </div>
  )
}

export default App
