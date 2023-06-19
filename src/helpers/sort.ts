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

export const newSortProducts = (products: ProductTuple[], method: SortMethod) => {
  const filtered = filterProductsById(products);
  const result = [...filtered];

  for (let p = 0; p < products.length; p++) {
    // iterate over products and check for uniques
    const product = products[p];
    const [id] = product;

    for (let i = 0; i < result.length; i++) {
      // sort each product by pick location
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
        if (Number(currentShelf) > Number(nextShelf)) {
          swap(result, i, i + 1);
        }
      }

      if (currentBay > nextBay) {
        swap(result, i, i + 1);
      }

      if (currentBay < nextBay) {
        continue;
      }

      // if currentBay is more than one letter eg AZ not A
      // then sort by the first letter
      // then sort by the second letter
    }
  }

  if (method === "descending") {
    result.reverse();
  }

  return result;
};
