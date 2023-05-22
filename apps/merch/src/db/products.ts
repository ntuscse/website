import { readItem, readTable, updateItem } from "./dynamodb";
import { Product } from "types";

const PRODUCT_TABLE_NAME = process.env.PRODUCT_TABLE_NAME || "";

export const getProducts = async () => {
  const dynamoProducts = await readTable<DynamoProduct>(PRODUCT_TABLE_NAME);
  return dynamoProducts.map(decodeProduct);
};
export const getProduct = async (id: string) => {
  const dynamoProduct = await readItem<DynamoProduct>(PRODUCT_TABLE_NAME, id);
  return decodeProduct(dynamoProduct);
};

interface DynamoProduct {
  id: string;
  name: string;
  price: number;
  product_category: string;
  size_chart?: string;
  images: string[];
  colorways: string[];
  is_available: boolean;
  sizes: string[];
  stock: {
    [color: string]: {
      [size: string]: number;
    };
  };
}

const decodeProduct = (product: DynamoProduct): Product => {
  return {
    id: product.id || "",
    name: product.name || "",
    price: product.price || 0,
    category: product.product_category || "",
    size_chart: product.size_chart || null,
    images: product.images || [],
    colors: product.colorways || {},
    is_available: product.is_available || false,
    sizes: product.sizes || [],
    stock: product.stock || {},
  };
};

export const incrementStockCount = async (item_id: string, increment_value: number, size: string, color: string): Promise<void> => {
  const update_expression = `ADD stock.#color.#size :incrementValue`;
  const condition_expression = "is_available = :isAvailable AND stock.#color.#size >= :incrementValue";
  const expression_attribute_values = {
    ":incrementValue": { "N": String(increment_value) },
    ":isAvailable": { "BOOL": true },
  };
  const expression_attribute_names = {
    "#color": color,
    "#size": size,
  };
  await updateItem(
    PRODUCT_TABLE_NAME,
    item_id,
    update_expression,
    condition_expression,
    expression_attribute_values,
    expression_attribute_names,
    "id",
  );
};

