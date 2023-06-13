import { writeFileSync } from "fs";
import { logger } from "./logger";

export const formatRow = (row: string[]) => row.join(",");
export const formatCsv = (data: string[][]) => data.map(formatRow).join("\r\n");

export const createCsvFile = (path: string, data: string[][]) => {
  try {
    logger.info("creating csv file...");
    const csv = formatCsv(data);
    const file = writeFileSync(path, csv);
    logger.success(`csv file created in ${path}`);
    return file;
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
      process.exit(1);
    }
  }
};
