export class Product {
  constructor(
    public id: string = "",
    public name: string = "",
    public price: number = 0, // Price of the product in cents ($19 = 1900).
    public images: string[] = [], // URL of the images.
    public sizes: ProductSizeTypes[] = [],
    public productCategory: ProductCategoryType = "",
    public isAvailable?: boolean
  ) {}
}

export type ProductSizeTypes =
  | "3xs"
  | "xxs"
  | "xs"
  | "s"
  | "m"
  | "l"
  | "xl"
  | "2xl"
  | "3xl";

export type ProductCategoryType = string;
