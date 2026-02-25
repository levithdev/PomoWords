import type React from "react"

export interface ImportExportJsonProps {
  actions: {
    exportJSON: () => void
    importJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

export function ImportExportJson({
  actions
}: ImportExportJsonProps) {

  const { exportJSON, importJSON } = actions

  return (
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
  )
}