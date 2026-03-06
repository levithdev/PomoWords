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
    <div className="flex mt-8 items-center">
      <div className="m-4">
        <button
          className="px-2 py-2 bg-slate-600 border rounded-xl border-black "
          onClick={exportJSON}
        >
          Export JSON
        </button>
      </div>
      <div className="m-4">
        <label className="px-2 py-2 bg-slate-600 border rounded-xl border-black ">
          import
          <input
            type="file"
            accept="application/json"
            onChange={importJSON}
            style={{ display: "none" }}
          />
        </label>

      </div>
    </div>
  )
}