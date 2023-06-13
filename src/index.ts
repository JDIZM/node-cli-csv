#!/usr/bin/env node

import cac from "cac";
import { version } from "../package.json";
import { checkColumns, readCsvSync, createCsvFile, logger, parseCsv } from "./helpers";
import { sortProducts } from "./helpers/sort";

const cli = cac();

cli.option("-p, --path <path>", "path to input csv file");
cli.option("-o, --output <path>", "path to output csv file");
cli.help();
cli.version(version);

// this is a fallthrough command that will match any command that is not matched.
cli.command("[...args]").allowUnknownOptions().action(run);

cli.parse();

export interface CliOptions {
  path?: string;
  output?: string;
}

async function run(args: string[], options: CliOptions = {}) {
  if (!options.path) {
    logger.error("Please provide a path to the input csv file");
    return;
  }
  if (!options.output) {
    logger.error("Please provide an output path for the csv file");
    return;
  }

  logger.info("processing csv...");
  const csv = readCsvSync(options.path);

  const [columns, ...rows] = parseCsv(csv);
  checkColumns(columns);
  logger.info(`processing ${rows.length} rows`);

  sortProducts(rows);

  const sortedProducts = [columns, ...rows];
  logger.success(`sorted ${sortedProducts.length - 1} products`);

  createCsvFile(options.output, sortedProducts);
}
