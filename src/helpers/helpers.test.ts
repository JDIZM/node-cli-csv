import { describe, expect, it, vi } from "vitest";
import { writeFileSync } from "fs";
import { formatRow, formatCsv, createCsvFile } from "./createFile";
import { parseCsv } from "./parseCsv";

vi.mock("fs", async () => ({
  default: vi.fn(),
  writeFileSync: vi.fn().mockReturnValue("foo")
}));

describe("createCsvFile", () => {
  const data = [
    ["product_code", "quantity", "pick_location"],
    ["B1234", "2", "A1"],
    ["B1235", "3", "A2"],
    ["B1236", "4", "A3"]
  ];

  describe("formatRow", () => {
    it("should format a row", () => {
      const row = ["product_code", "quantity", "pick_location"];
      const formatted = formatRow(row);
      expect(formatted).toBe("product_code,quantity,pick_location");
    });
  });

  describe("formatCsv", () => {
    it("should format a csv", () => {
      const formatted = formatCsv(data);
      expect(formatted).toBe("product_code,quantity,pick_location\r\nB1234,2,A1\r\nB1235,3,A2\r\nB1236,4,A3");
    });
  });

  it("should create a csv file", () => {
    const csv = createCsvFile("./src/output.csv", data);
    const formatted = formatCsv(data);
    expect(writeFileSync).toBeCalled();
    expect(writeFileSync).toHaveBeenCalledWith("./src/output.csv", formatted);
    expect(csv).toBe("foo");
  });
});

describe("parseCsv", () => {
  it("should return an array of arrays", () => {
    const csv = `product_code,quantity,pick_location\r\n
                  B1234,2,A1\r\n
                  B1235,3,A2\r\n
                  B1236,4,A3\r\n`;
    const parsed = parseCsv(csv);
    expect(parsed).toEqual([
      ["product_code", "quantity", "pick_location"],
      ["B1234", "2", "A1"],
      ["B1235", "3", "A2"],
      ["B1236", "4", "A3"]
    ]);
  });
  it("should trim whitespace and trailing commas", () => {
    const csv = `product_code,quantity,pick_location,   \r\n  
                  B1234,2,A1 \r\n 
                  B1235,3,A2,  \r\n
                  B1236,4,A3    \r\n`;
    const parsed = parseCsv(csv);
    expect(parsed).toEqual([
      ["product_code", "quantity", "pick_location"],
      ["B1234", "2", "A1"],
      ["B1235", "3", "A2"],
      ["B1236", "4", "A3"]
    ]);
  });
});

describe("readCsv", () => {
  it.todo("should read a csv file");
});

describe("logger", () => {
  it.todo("should log messages to the console");
});

describe("checkColumns", () => {
  it.todo("should check for required columns in csv file");
});
