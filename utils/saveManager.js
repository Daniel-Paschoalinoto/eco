import fs from "fs";
import path from "path";

const savePath = path.resolve("save", "save.json");

export function saveGame(saveData) {
  const dataToSave = {
    ...saveData,
  };

  fs.writeFileSync(savePath, JSON.stringify(dataToSave, null, 2), "utf-8");
}

export function loadGame() {
  if (fs.existsSync(savePath)) {
    const rawData = fs.readFileSync(savePath, "utf-8");
    return JSON.parse(rawData);
  }
  return null;
}

export function ensureSaveExists(defaultData) {
  if (!fs.existsSync(savePath)) {
    saveGame(defaultData);
  }
}
