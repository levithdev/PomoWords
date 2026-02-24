interface InputPomodoroProps {
    text: string;
    onChange: (newText: string) => void 
}

export function InputPomodoro({text, onChange}: InputPomodoroProps ) {


    return (
        <div>
            <input
             type="text"
             value={text}
             onChange={(e) => onChange(e.target.value)}
             />
        </div>
    )
}