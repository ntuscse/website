/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { Product } from "../@types/Product";
// todo turn into real api
class ProductsApi {
  async getProducts(): Promise<Product[]> {
    const req = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/products`);
    const products = await req.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return products?.docs as Product[];
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }

}

export default new ProductsApi();
