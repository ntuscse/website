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

export type ProductType = {
	id: string;
	name: string;
	price: number; // Price of the product in cents ($19 = 1900).
	images: string[]; // URL of the images.
	sizes: ProductSizeTypes[];
	productCategory: ProductCategoryType;
	isAvailable?: boolean;
};
