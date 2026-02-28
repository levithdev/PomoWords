import type { Pomo } from "../types/Pomo";

export function useImportExportJson(
  pomoList: Pomo[],
  setPomoList: React.Dispatch<React.SetStateAction<Pomo[]>>
) {

  const exportJSON = () => {
    const jsonString = JSON.stringify(pomoList, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "dados.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const importJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const result = e.target?.result;

        if (typeof result !== "string") {
          throw new Error("Invalid file format");
        }

        const parsedData: Pomo[] = JSON.parse(result);

        if (!Array.isArray(parsedData)) {
          throw new Error("Invalid JSON structure");
        }

        setPomoList((prev) => [...prev, ...parsedData]);

      } catch {
        alert("ERROR! INVALID JSON FILE");
      }
    };

    reader.readAsText(file);
  };
  return {
    importJSON,
    exportJSON
  }
}