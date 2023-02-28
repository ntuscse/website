import { IOrder } from "../@types/IOrder";

// todo turn into real api
class OrdersApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async getOrders(): Promise<any> {
    const res = []
    const item1: IOrder = {
      colour: "black",
      date: new Date("2022-01-31"),
      image_url: "https://i.kym-cdn.com/entries/icons/original/000/033/421/cover2.jpg",
      item: "graduation hat",
      order_id: "1",
      order_person: "kenneth west",
      qty: 2,
      size: "M"
    }
    res.push(item1);

    const item2: IOrder = {
      colour: "white",
      date: new Date("2022-02-13"),
      image_url: "https://i.kym-cdn.com/photos/images/newsfeed/002/164/493/b8b.jpg",
      item: "scorpion",
      order_id: "2",
      order_person: "aubrey graham drake",
      qty: 1,
      size: "L"
    }
    res.push(item2);

    const item3: IOrder = {
      colour: "beige",
      date: new Date("2010-02-13"),
      image_url: "https://i.pinimg.com/474x/c0/f9/f1/c0f9f10a0061a8dd1080d7d9e560579c.jpg",
      item: "dat stick",
      order_id: "3",
      order_person: "rich brian",
      qty: 1,
      size: "S"
    }
    res.push(item3);

    return res as IOrder[];
  }
}

export default new OrdersApi();
