import { describe, expect, it, vi } from "vitest";
import { swap, defaultCompare, sortProducts, ProductTuple, newSortProducts } from "./sort";

describe("swap", () => {
  it("should swap two items in an array", () => {
    const array = [1, 2];
    swap(array, 0, 1);
    expect(array).toEqual([2, 1]);
  });
});

describe("defaultCompare", () => {
  it("should return -1 if a < b", () => {
    const result = defaultCompare(1, 2);
    expect(result).toBe(-1);
  });
  it("should return 1 if a > b", () => {
    const result = defaultCompare(2, 1);
    expect(result).toBe(1);
  });
  it("should return 0 if a === b", () => {
    const result = defaultCompare(1, 1);
    expect(result).toBe(0);
  });
});

describe("array sort", () => {
  it("should sort an array of numbers", () => {
    const array = [4, 2, 3, 1, 5];
    const result = array.sort((a, b) => defaultCompare(a, b));
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should sort an array of strings", () => {
    const array = ["a", "z", "ag", "ac", "ab", "ae", "ba"];
    const result = array.sort((a, b) => defaultCompare(a, b));
    expect(result).toEqual(["a", "ab", "ac", "ae", "ag", "ba", "z"]);
  });

  it("should sort an array of strings that are numbers", () => {
    const array = ["5", "4", "3", "2", "1"];
    const result = array.sort((a, b) => defaultCompare(a, b));
    expect(result).toEqual(["1", "2", "3", "4", "5"]);
  });
});

describe("sortProducts", () => {
  it("should sort an array of products by pick location in ascending order from A 1 to A 10", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["B1237", "2", "A 10"],
      ["B1234", "2", "A 3"],
      ["B1235", "3", "A 2"],
      ["B1236", "4", "A 1"]
    ];
    const [columns, ...rows] = data;

    const sortedRows = sortProducts(rows);
    const result = [columns, ...sortedRows];

    expect(result).toEqual([
      ["product_code", "quantity", "pick_location"],
      ["B1236", "4", "A 1"],
      ["B1235", "3", "A 2"],
      ["B1234", "2", "A 3"],
      ["B1237", "2", "A 10"]
    ]);
  });
  it("should sort an array of products by pick location (bay and shelf height) in ascending order", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["A", "10", "Z 1"],
      ["B", "5", "Z 10"],
      ["C", "10", "A 1"],
      ["G", "1", "A 7"]
    ];
    const [columns, ...rows] = data;

    const sortedRows = sortProducts(rows);
    const result = [columns, ...sortedRows];

    expect(result).toEqual([
      ["product_code", "quantity", "pick_location"],
      ["C", "10", "A 1"],
      ["G", "1", "A 7"],
      ["A", "10", "Z 1"],
      ["B", "5", "Z 10"]
    ]);
  });
  it("should sort an array of products by bay and shelf height in ascending order WHEN bays are the same FROM lowest to highest shelf", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["E", "1", "AB 1"],
      ["F", "1", "AB 10"],
      ["H", "1", "AB 9"],
      ["H", "1", "AB 7"]
    ];
    const [columns, ...rows] = data;

    const sortedRows = sortProducts(rows);
    const result = [columns, ...sortedRows];

    expect(result).toEqual([
      ["product_code", "quantity", "pick_location"],
      ["E", "1", "AB 1"],
      ["H", "1", "AB 7"],
      ["H", "1", "AB 9"],
      ["F", "1", "AB 10"]
    ]);
  });

  it("should sort by shelf height if the bays are not the same", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["B1237", "2", "A 10"],
      ["B1237", "2", "Z 10"],
      ["B1234", "2", "Z 3"],
      ["B1234", "2", "A 3"],
      ["B1235", "3", "Z 2"],
      ["B1236", "4", "Z 1"],
      ["B1235", "3", "A 2"],
      ["B1236", "4", "A 1"]
    ];

    const [columns, ...rows] = data;

    const sortedRows = sortProducts(rows);
    const result = [columns, ...sortedRows];
    expect(result).toEqual([
      ["product_code", "quantity", "pick_location"],
      ["B1236", "4", "A 1"],
      ["B1235", "3", "A 2"],
      ["B1234", "2", "A 3"],
      ["B1237", "2", "A 10"],
      ["B1236", "4", "Z 1"],
      ["B1235", "3", "Z 2"],
      ["B1234", "2", "Z 3"],
      ["B1237", "2", "Z 10"]
    ]);
  });
});

describe("new sort products", () => {
  // TODO a to az
  const data: ProductTuple[] = [
    ["product_code", "quantity", "pick_location"],
    ["1", "1", "AB 1"],
    ["2", "1", "AB 10"],
    ["3", "1", "AB 9"],
    ["4", "1", "AB 7"]
  ];
  // it("should throw an error if the pick location is invalid", () => {
  //   //
  //   // const [columns, ...rows] = data;
  //   // const result = newSortProducts(rows, "ascending");
  //   // // console.log('');
  //   // console.log("result", result);
  // });

  it("should correctly split a pick location into bay and shelf height", () => {
    //
  });

  it("should sort products with the same bay by shelf height", () => {
    const [, ...rows] = data;
    const result = newSortProducts(rows, "ascending");
    expect(result).toEqual([
      ["1", "1", "AB 1"],
      ["4", "1", "AB 7"],
      ["3", "1", "AB 9"],
      ["2", "1", "AB 10"]
    ]);
  });

  it("should sort products that do not have the same bay by bay and then by shelf height", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      // ["1", "1", "A 1"],
      // ["2", "1", "Z 1"],
      ["3", "1", "AB 10"],
      ["4", "1", "AB 9"],
      ["5", "1", "AB 7"],
      ["6", "1", "AZ 1"],
      ["7", "1", "AZ 10"],
      ["8", "1", "AZ 9"],
      ["9", "1", "AZ 7"]
    ];
    const [, ...rows] = data;
    const result = newSortProducts(rows, "ascending");
    console.log("result", result);
    expect(result).toEqual([
      ["5", "1", "AB 7"],
      ["4", "1", "AB 9"],
      ["3", "1", "AB 10"],
      ["6", "1", "AZ 1"],
      ["9", "1", "AZ 7"],
      ["8", "1", "AZ 9"],
      ["7", "1", "AZ 10"]
    ]);
  });

  it("should sort an array of products by pick location in ascending order from A 1 to AZ 10", () => {
    //
  });

  it('should reverse the results if the method is "descending"', () => {
    const [, ...rows] = data;
    const result = newSortProducts(rows, "descending");
    expect(result).toEqual([
      ["2", "1", "AB 10"],
      ["3", "1", "AB 9"],
      ["4", "1", "AB 7"],
      ["1", "1", "AB 1"]
    ]);
  });
});
