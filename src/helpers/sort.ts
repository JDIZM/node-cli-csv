const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
} as const;

type Compare = (typeof Compare)[keyof typeof Compare];

export type ProductTuple = [string, string, string];

export const defaultCompare = (a: string | number, b: string | number): Compare => {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};

export const swap = (array: unknown[], a: number, b: number) => {
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

export const sortProducts = (products: ProductTuple[]) => {
  const sortByPickLocation = (a: ProductTuple, b: ProductTuple) => {
    const [, , pickLocationA] = a;
    const [, , pickLocationB] = b;
    const [bayA, shelfA] = pickLocationA.split(" ");
    const [bayB, shelfB] = pickLocationB.split(" ");

    if (bayA === bayB) {
      return defaultCompare(Number(shelfA), Number(shelfB));
    }

    return defaultCompare(pickLocationA, pickLocationB);
  };
  products.sort(sortByPickLocation);
  return products;
};

type SortMethod = "ascending" | "descending";

export const newSortProducts = (products: ProductTuple[], method: SortMethod) => {
  const result = [...products];
  console.log("method", method);

  for (let p = 0; p < result.length; p++) {
    // iterate over products
    console.log("product", result[p]);
    for (let i = 0; i < result.length; i++) {
      // sort each product by pick location
      // console.log("i", i);
      const currentProduct = result[i];
      const nextProduct = result[i + 1];
      console.log(currentProduct, nextProduct);
      if (!nextProduct) {
        break;
      }
      const [, , currentPickLocation] = currentProduct;
      const [, , nextPickLocation] = nextProduct;
      const [currentBay, currentShelf] = currentPickLocation.split(" ");
      const [nextBay, nextShelf] = nextPickLocation.split(" ");

      if (currentBay === nextBay) {
        // console.log("same bay");
        if (Number(currentShelf) > Number(nextShelf)) {
          swap(result, i, i + 1);
        }
      }

      if (currentBay > nextBay) {
        swap(result, i, i + 1);
      }
    }
  }

  if (method === "descending") {
    result.reverse();
  }

  return result;
};
