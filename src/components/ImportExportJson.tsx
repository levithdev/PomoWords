import type React from "react"

export interface ImportExportJsonProps {
  actions: {
    exportJSON: () => void
    importJSON: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
}

export function ImportExportJson({ actions }: ImportExportJsonProps) {
  const { exportJSON, importJSON } = actions

  const buttonStyle: React.CSSProperties = {
    background: "transparent",
    border: "1px solid rgba(139,92,246,0.20)",
    borderRadius: 6,
    color: "#4B4560",
    fontSize: 11,
    padding: "4px 10px",
    cursor: "pointer",
    transition: "color 0.15s, border-color 0.15s",
  }

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement | HTMLLabelElement>, enter: boolean) => {
    const el = e.currentTarget as HTMLElement
    el.style.color = enter ? "#A78BFA" : "#4B4560"
    el.style.borderColor = enter ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.20)"
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button
        onClick={exportJSON}
        style={buttonStyle}
        onMouseEnter={(e) => buttonHover(e, true)}
        onMouseLeave={(e) => buttonHover(e, false)}
      >
        export
      </button>
      <label
        style={{ ...buttonStyle, display: "inline-block" }}
        onMouseEnter={(e) => buttonHover(e, true)}
        onMouseLeave={(e) => buttonHover(e, false)}
      >
        import
        <input type="file" accept="application/json" onChange={importJSON} style={{ display: "none" }} />
      </label>
    </div>
  )
}