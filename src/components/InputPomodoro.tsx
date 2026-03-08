interface InputPomodoroProps {
  text: string;
  onChange: (newText: string) => void
}
// rounded
export function InputPomodoro({ text, onChange }: InputPomodoroProps) {
  return (
    <div className=" flex flex-1 ">
      <textarea
        className="flex-1 w-full resize-none border-2 border-black  p-4 text-sm focus:outline-none"
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>

  )
}