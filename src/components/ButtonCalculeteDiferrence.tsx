interface ButtonCalculateDifferenceProps {
  onCalculateDifference: () => void
  onPomoVerification: () => void
  difference: number | null;
}

export function ButtonCalculateDiferrence(
  { onCalculateDifference, onPomoVerification, difference }: ButtonCalculateDifferenceProps) {

  return (
    <button
      className="border border-black rounded-lg min-h-10 pr-2 pl-2 min-w-16"
      onClick={() => {
        onCalculateDifference()
        onPomoVerification()
      }}>
      {difference === null ? (
        "Calculate difference"
      ) : (
        difference
      )}
    </button>
  )

}