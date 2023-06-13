import fs from "fs";

export const readCsvSync = (path: string) => {
  const file = fs.readFileSync(path);
  const csv = file.toString();
  return csv;
};
