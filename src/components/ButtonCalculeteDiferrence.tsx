interface ButtonCalculateDifferenceProps {
onCalculateDifference: () => void 
onPomoVerification: () => void 
difference: number | null;
}

export function ButtonCalculateDiferrence (
    {onCalculateDifference, onPomoVerification, difference}: ButtonCalculateDifferenceProps) { 

    return (
        <div>
            <button onClick={() => {
                onCalculateDifference()
                onPomoVerification() 
                }}>
                {difference === null ? (
                    "Calculate difference"
                ) : (
                    difference
                )}
            </button>
        </div>
    )

}