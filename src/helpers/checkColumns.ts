import { logger } from "./logger";

export const checkColumns = (columns: string[]) => {
  logger.info("checking csv columns...");
  const requiredColumns = ["product_code", "quantity", "pick_location"];
  const missingColumns = requiredColumns.filter((requiredColumn) => !columns.includes(requiredColumn));
  if (missingColumns.length) {
    logger.error(`Missing columns: ${missingColumns.join(", ")}`);
    process.exit(1);
  }
  logger.success("all columns present");
};
