import { IProduct } from "../@types/IProduct";

// todo turn into real api
class ProductsApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getProducts(): Promise<any> {
    const res: IProduct[] = [
      {
        id: "1",
        name: "product1",
        price: 1000,
        images: [
          "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
          "https://i.pinimg.com/474x/c0/f9/f1/c0f9f10a0061a8dd1080d7d9e560579c.jpg",
        ],
        sizes: ["s", "m", "l", "xl"],
        productCategory: "shirt",
        isAvailable: true,
      },
      {
        id: "2",
        name: "product2",
        price: 2000,
        images: [
          "https://i.kym-cdn.com/photos/images/newsfeed/002/164/493/b8b.jpg",
          "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
        ],
        sizes: ["s", "m"],
        productCategory: "sweater",
        isAvailable: true,
      },
      {
        id: "3",
        name: "product3",
        price: 3000,
        images: [
          "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
          "https://i.kym-cdn.com/photos/images/newsfeed/002/164/493/b8b.jpg",
          "https://i.pinimg.com/474x/c0/f9/f1/c0f9f10a0061a8dd1080d7d9e560579c.jpg",
        ],
        sizes: ["xs", "s", "m", "l"],
        productCategory: "hat",
        isAvailable: false,
      },
    ];

    return res;
  }
}

export default new ProductsApi();
