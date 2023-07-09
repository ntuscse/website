import { Product } from "types/lib/merch";

export const getQtyInStock = (
  product: Product,
  color: string,
  size: string
): number => {
  // returns remaining stock for specified color and size
  if (product.stock[color] && product.stock[color][size]) {
    return product.stock[color][size];
  }
  return 0;
};

export const displayStock = (
  product: Product,
  color: string,
  size: string
): string => {
  // returns string describing remaining stock
  if (product.stock[color] && product.stock[color][size]) {
    const qty = product.stock[color][size];
    if (qty > 0) {
      return `${qty} available`;
    }
    return "OUT OF STOCK";
  }

  return "ERROR: invalid color/size selected";
};

export const isOutOfStock = (product: Product): boolean => {
  // returns true if product is out of stock in all colors and sizes
  if (product && product.stock) {
    const totalQty = Object.values(product.stock).reduce(
      (acc, stockByColor) => {
        const colorQty = Object.values(stockByColor).reduce(
          (acc2, qty) => acc2 + qty,
          0
        );
        return acc + colorQty;
      },
      0
    );
    return totalQty <= 0;
  } else {
    return false;
  }
};

export const isColorAvailable = (product: Product, color: string): boolean => {
  // returns true if color is available in any size
  // returns false if color is out of stock in all sizes
  const colorStock = Object.values(product.stock[color]).reduce(
    (acc, size) => acc + size,
    0
  );
  return colorStock > 0;
};

export const isSizeAvailable = (product: Product, size: string): boolean => {
  // returns true if size is available in any color
  // returns false if size is out of stock in all colors
  const sizeStock = Object.values(product.stock).map((d) => d[size] || 0);
  const totalQty = sizeStock.reduce((a, b) => {
    return a + b;
  }, 0);
  return totalQty > 0;
};

export const getDefaultSize = (product: Product): string | null => {
  if (!product.sizes) return null;
  const index1 = product.sizes.findIndex((size) =>
    isSizeAvailable(product, size)
  );
  const index2 = product.sizes.findIndex(
    (size, idx) => idx > index1 && isSizeAvailable(product, size)
  );
  if (index1 !== -1 && index2 === -1) {
    return product.sizes[index1]; // only 1 size available
  }
  return null;
};

export const getDefaultColor = (product: Product): string | null => {
  if (!product.colors) return null;
  const index1 = product.colors.findIndex((color) =>
    isColorAvailable(product, color)
  );
  const index2 = product.colors.findIndex(
    (color, idx) => idx > index1 && isColorAvailable(product, color)
  );
  if (index1 !== -1 && index2 === -1) {
    return product.colors[index1]; // only 1 color available
  }
  return null;
};
