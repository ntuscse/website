import { MerchSaleStatus } from "types";

class MerchStoreApi {
  // eslint-disable-next-line @typescript-eslint/require-await
  async setStoreStatus({
    disabled,
    displayText,
  }: MerchSaleStatus): Promise<void> {
    // TODO: set store status in the backend
    console.log(disabled, displayText);
    return new Promise((res, rej) => {
      try {
        setTimeout(() => {
          res();
        }, 1000);
      } catch (error) {
        rej(error);
      }
    });
  }

  async getStoreStatus(): Promise<MerchSaleStatus> {
    //   TODO: get store status from the backend
    return new Promise((res, rej) => {
      try {
        setTimeout(() => {
          res({
            disabled: true,
            displayText:
              "We are currently preparing for the next merch sale. Please look forward to our email!",
          });
        }, 1000);
      } catch (error) {
        rej(error);
      }
    });
  }
}

export default new MerchStoreApi();
