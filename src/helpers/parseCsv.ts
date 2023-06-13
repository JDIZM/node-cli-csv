import { ProductTuple } from "./sort";

export const parseCsv = (csv: string): ProductTuple[] => {
  const rows = csv.split("\r");

  const trimmedRows = rows.map((row) => {
    const trimmed = row.trim();
    if (!trimmed.length) {
      return [];
    }
    const [productCode, qty, pickLocation] = trimmed.split(",");
    return [productCode, qty, pickLocation];
  });

  const result = trimmedRows.filter((row) => row.length === 3) as ProductTuple[];

  return result;
};
