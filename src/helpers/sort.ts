export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
} as const;

type Compare = (typeof Compare)[keyof typeof Compare];

export type ProductTuple = [string, string, string];

// export const defaultCompare = (a: string | number, b: string | number): Compare => {
//   if (a === b) {
//     return Compare.EQUALS;
//   }
//   return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
// };

export const swap = (array: unknown[], a: number, b: number) => {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

// export const sortProducts = (products: ProductTuple[]) => {
//   const sortByPickLocation = (a: ProductTuple, b: ProductTuple) => {
//     const [, , pickLocationA] = a;
//     const [, , pickLocationB] = b;
//     const [bayA, shelfA] = pickLocationA.split(" ");
//     const [bayB, shelfB] = pickLocationB.split(" ");

//     if (bayA === bayB) {
//       return defaultCompare(Number(shelfA), Number(shelfB));
//     }

//     return defaultCompare(pickLocationA, pickLocationB);
//   };
//   products.sort(sortByPickLocation);
//   return products;
// };

type SortMethod = "ascending" | "descending";

const filterProductsById = (products: ProductTuple[]) => {
  const productsMap = new Map<string, ProductTuple>();

  for (let p = 0; p < products.length; p++) {
    const product = products[p];
    const [id] = product;

    if (productsMap.has(id)) {
      const existingProduct = productsMap.get(id);

      if (existingProduct?.length === 3) {
        const [, existingQty] = existingProduct;
        const [, qty] = product;
        existingProduct[1] = String(Number(existingQty) + Number(qty));
        productsMap.set(id, existingProduct);
      }
      continue;
    }
    productsMap.set(id, product);
  }

  return [...productsMap.values()];
};

export const compareStrings = (a: string, b: string) => {
  // Always comparing a to b

  // Single chars
  // Case 1: A, A - single chars, both match
  // Case 2: A, Z || Z, A - single chars, no match

  // Multiple chars
  // Case 3: AA, AA - multiple chars, both match
  // Case 4: AA, AZ - multiple chars, only first letters match
  // Case 5: ZA, AA - multiple chars, only second letters match
  // Case 6: ZA, AZ - multiple chars, no match

  // Case 7: AA, Z - multiple chars, and single char
  // Case 8: Z, AA - single char, and multiple chars

  if (a.length > 2 || b.length > 2) {
    throw new Error("Invalid string length; string must be 2 characters or less.");
  }

  if (a.length === 1 && b.length === 1) {
    // Case 1: A, A - single chars, both match
    if (a === b) {
      return Compare.EQUALS;
    }
    // Case 2: A, Z || Z, A - single chars, no match
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }

  if (a.length > 1 && b.length > 1) {
    const [firstLetterA, secondLetterA] = a.split("");
    const [firstLetterB, secondLetterB] = b.split("");

    if (firstLetterA === firstLetterB) {
      if (secondLetterA === secondLetterB) {
        //  Case 3: AA, AA - multiple chars, both match
        return Compare.EQUALS;
      }

      // Case 4: AA, AZ - multiple chars, only first letters match
      return secondLetterA < secondLetterB ? Compare.LESS_THAN : Compare.BIGGER_THAN;
    }

    // Case 6: ZA, AZ - multiple chars, no match
    if (firstLetterA !== firstLetterB && secondLetterA !== secondLetterB) {
      return firstLetterA < firstLetterB ? Compare.LESS_THAN : Compare.BIGGER_THAN;
    }

    // Case 5: ZA, AA - multiple chars, only second letters match
    return firstLetterA < firstLetterB ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }

  // Case 7: AA, Z - multiple chars, and single char
  if (a.length > 1 && b.length === 1) {
    return Compare.BIGGER_THAN;
  }

  // Case 8: Z, AA - single char, and multiple chars
  // if (a.length === 1 && b.length > 1) {
  return Compare.LESS_THAN;
  // }
};

export const sortProducts = (products: ProductTuple[], method: SortMethod) => {
  const result = filterProductsById(products);

  for (let p = 0; p < products.length; p++) {
    // iterate over products

    for (let i = 0; i < result.length; i++) {
      // sort each product by pick location
      const currentProduct = result[i];
      const nextProduct = result[i + 1];

      if (!nextProduct) {
        break;
      }

      const [, , currentPickLocation] = currentProduct;
      const [, , nextPickLocation] = nextProduct;
      const [currentBay, currentShelf] = currentPickLocation.split(" ");
      const [nextBay, nextShelf] = nextPickLocation.split(" ");

      const compare = compareStrings(currentBay, nextBay);

      // top of the sort order
      // Case 1: skip all less than results
      if (compare === Compare.LESS_THAN) {
        continue;
      }

      // swap based on shelf if both match
      // Case 2: swap based on shelf if both match
      if (compare === Compare.EQUALS) {
        if (Number(currentShelf) > Number(nextShelf)) {
          swap(result, i, i + 1);
        }
      }

      // swap based on bay
      if (compare === Compare.BIGGER_THAN) {
        swap(result, i, i + 1);
      }
    }
  }

  if (method === "descending") {
    result.reverse();
  }

  return result;
};
