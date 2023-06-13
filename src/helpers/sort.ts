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
