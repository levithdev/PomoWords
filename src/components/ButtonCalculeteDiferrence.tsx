interface ButtonCalculateDifferenceProps {
  onCalculateDifference: () => void
  onPomoVerification: () => void
  difference: number | null
}

export function ButtonCalculateDiferrence({
  onCalculateDifference,
  onPomoVerification,
  difference,
}: ButtonCalculateDifferenceProps) {
  return (
    <button
      onClick={() => {
        onCalculateDifference()
        onPomoVerification()
      }}
      style={{
        background: "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.35)",
        borderRadius: 8,
        color: difference === null ? "#A78BFA" : difference >= 0 ? "#86EFAC" : "#FDA4AF",
        fontSize: 13,
        fontWeight: 500,
        padding: "8px 16px",
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s",
        minWidth: 64,
        minHeight: 40,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.22)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(139,92,246,0.12)")}
    >
      {difference === null ? "Calculate difference" : difference}
    </button>
  )
}