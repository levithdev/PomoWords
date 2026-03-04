interface InputPomodoroProps {
  text: string;
  onChange: (newText: string) => void
}

export function InputPomodoro({ text, onChange }: InputPomodoroProps) {
  return (
    <textarea
      className="flex-1 w-full resize-none border-2 border-black rounded p-4 text-sm focus:outline-none"
      value={text}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}