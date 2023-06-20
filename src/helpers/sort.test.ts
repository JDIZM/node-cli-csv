import { describe, expect, it, vi } from "vitest";
import { swap, ProductTuple, sortProducts, compareStrings, Compare } from "./sort";

describe("swap", () => {
  it("should swap two items in an array", () => {
    const array = [1, 2];
    swap(array, 0, 1);
    expect(array).toEqual([2, 1]);
  });
});

describe("array sort", () => {
  it("should sort an array of strings", () => {
    const array = ["a", "z", "ag", "ac", "ab", "ae", "ba"];
    const result = array.sort((a, b) => compareStrings(a, b));
    expect(result).toEqual(["a", "z", "ab", "ac", "ae", "ag", "ba"]);
  });

  it("should sort an array of strings that are numbers", () => {
    const array = ["5", "4", "3", "2", "1"];
    const result = array.sort((a, b) => compareStrings(a, b));
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

    const sortedRows = sortProducts(rows, "ascending");
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

    const sortedRows = sortProducts(rows, "ascending");
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

    const sortedRows = sortProducts(rows, "ascending");
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

    const sortedRows = sortProducts(rows, "ascending");
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

describe("sortProducts", () => {
  const data: ProductTuple[] = [
    ["product_code", "quantity", "pick_location"],
    ["1", "1", "AB 1"],
    ["2", "1", "AB 10"],
    ["3", "1", "AB 9"],
    ["4", "1", "AB 7"]
  ];

  it("should sort products with the same bay by shelf height", () => {
    const [, ...rows] = data;
    const result = sortProducts(rows, "ascending");
    expect(result).toEqual([
      ["1", "1", "AB 1"],
      ["4", "1", "AB 7"],
      ["3", "1", "AB 9"],
      ["2", "1", "AB 10"]
    ]);
  });

  it('should reverse the results if the method is "descending"', () => {
    const [, ...rows] = data;
    const result = sortProducts(rows, "descending");
    expect(result).toEqual([
      ["2", "1", "AB 10"],
      ["3", "1", "AB 9"],
      ["4", "1", "AB 7"],
      ["1", "1", "AB 1"]
    ]);
  });

  it("should deduplicate products by id and add their qty", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["1", "1", "AB 1"],
      ["1", "1", "AB 1"],
      ["2", "1", "AB 10"],
      ["3", "1", "AB 9"],
      ["4", "1", "AB 7"]
    ];
    const [, ...rows] = data;
    const result = sortProducts(rows, "descending");
    expect(result).toEqual([
      ["2", "1", "AB 10"],
      ["3", "1", "AB 9"],
      ["4", "1", "AB 7"],
      ["1", "2", "AB 1"]
    ]);
  });

  it("should sort products that do not have the same bay by bay and then by shelf height", () => {
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["3", "1", "AB 10"],
      ["4", "1", "AB 9"],
      ["5", "1", "AB 7"],
      ["6", "1", "AZ 1"],
      ["7", "1", "AZ 10"],
      ["8", "1", "AZ 9"],
      ["9", "1", "AZ 7"]
    ];
    const [, ...rows] = data;
    const result = sortProducts(rows, "ascending");
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
    const data: ProductTuple[] = [
      ["product_code", "quantity", "pick_location"],
      ["1", "1", "A 1"],
      ["2", "1", "Z 1"],
      ["3", "1", "AB 10"],
      ["9", "1", "AZ 7"]
    ];
    const [, ...rows] = data;
    const result = sortProducts(rows, "ascending");
    expect(result).toEqual([
      ["1", "1", "A 1"],
      ["2", "1", "Z 1"],
      ["3", "1", "AB 10"],
      ["9", "1", "AZ 7"]
    ]);
  });
});

describe("compareStrings", () => {
  it("should throw an error if the string is more than two characters", () => {
    expect(() => compareStrings("ABC", "ABC")).toThrowError();
    expect(() => compareStrings("ABC", "AB")).toThrowError();
    expect(() => compareStrings("AB", "ABC")).toThrowError();
    expect(() => compareStrings("AB", "AB")).not.toThrowError();
  });
  // });
  describe("single char", () => {
    //  Case 1: A, A - single chars, both match
    it("should return EQUALS if single chars, both match", () => {
      const data = ["A", "A"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.EQUALS);
    });

    // Case 2: A, Z || Z, A - single chars, no match
    it("should return BIGGER THAN if single chars, no match", () => {
      const data = ["Z", "A"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.BIGGER_THAN);
    });

    it("should return LESS THAN if single chars, no match", () => {
      const data = ["A", "Z"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.LESS_THAN);
    });
  });

  describe("multiple chars", () => {
    //  Case 3: AA, AA - multiple chars, both match
    it("should return EQUALS if the first and second letters are the same", () => {
      const data = ["AA", "AA"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.EQUALS);
    });

    // Case 4: AA, AZ - multiple chars, only first letters match
    it("should return LESS THAN if the first letters match but the second char is lower", () => {
      const data = ["AA", "AB"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.LESS_THAN);
    });

    it("should return BIGGER THAN if the first letters match but the second char is higher", () => {
      const data = ["AB", "AA"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.BIGGER_THAN);
    });

    // Case 5: ZA, AA - multiple chars, only second letters match
    it("should return LESS THAN if the first letters dont match and only second letters match", () => {
      const data = ["AA", "BA"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.LESS_THAN);
    });

    it("should return BIGGER THAN if the first letters dont match and only second letters match", () => {
      const data = ["BA", "AA"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.BIGGER_THAN);
    });

    // Case 6: ZA, AZ - multiple chars, no match
    it("should return BIGGER THAN if no chars match and the first char is lower", () => {
      const data = [
        ["ZA", "AZ"],
        ["XY", "AK"]
      ];
      data.forEach(([a, b]) => {
        const result = compareStrings(a, b);
        expect(result).toEqual(Compare.BIGGER_THAN);
      });
    });

    it("should return LESS THAN if no chars match and the first char is higher", () => {
      const data = [
        ["AZ", "ZA"],
        ["KA", "XY"]
      ];
      data.forEach(([a, b]) => {
        const result = compareStrings(a, b);
        expect(result).toEqual(Compare.LESS_THAN);
      });
    });

    // Case 7: AA, Z - multiple chars, and single char
    it("should return BIGGER THAN if the first string is multiple chars and the second is a single char", () => {
      const data = ["AA", "Z"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.BIGGER_THAN);
    });

    // Case 8: Z, AA - single char, and multiple chars
    it("should return LESS THAN if the first string is a single char and second is multiple", () => {
      const data = ["Z", "AA"];
      const result = compareStrings(data[0], data[1]);
      expect(result).toEqual(Compare.LESS_THAN);
    });
  });
});
