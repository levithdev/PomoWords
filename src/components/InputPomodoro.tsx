interface InputPomodoroProps {
  text: string
  onChange: (newText: string) => void
}

export function InputPomodoro({ text, onChange }: InputPomodoroProps) {
  return (
    <div className="flex flex-1">
      <textarea
        className="flex-1 w-full resize-none p-4 text-sm focus:outline-none"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "#13102A",
          border: "1px solid rgba(139,92,246,0.20)",
          borderRadius: 8,
          color: "#E2DCF7",
          lineHeight: 1.6,
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.55)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.20)")}
      />
    </div>
  )
}