import { Product, ProductCategory } from "types";

export const products: Product[] = [
  {
    id: "1",
    name: "Cool T-shirt",
    colors: ["blue", "yellow"],
    sizes: ["S", "M", "L"],
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/451406/item/",
      "sggoods_09_451406.jpg?width=1008&impolicy=quality_75",
    ],
    is_available: true,
    price: 29.9,
    category: ProductCategory.TSHIRT,
    stock: {
      blue: {
        S: 10,
        M: 10,
        L: 10,
      },
      yellow: {
        S: 10,
        M: 10,
        L: 10,
      },
    },
    size_chart: undefined,
  },
  {
    id: "2",
    name: "Neat T-Shirt",
    colors: ["green", "black"],
    sizes: ["S", "M", "L"],
    images: [
      "https://image.uniqlo.com/UQ/ST3/sg/imagesgoods/451406/item/",
      "sggoods_09_451406.jpg?width=1008&impolicy=quality_75",
    ],
    is_available: true,
    price: 29.9,
    category: ProductCategory.TSHIRT,
    stock: {
      blue: {
        S: 10,
        M: 10,
        L: 10,
      },
      yellow: {
        S: 10,
        M: 10,
        L: 10,
      },
    },
    size_chart: undefined,
  },
];
