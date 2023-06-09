import {
    DynamoDB,
    GetItemCommand,
    ScanCommand
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { Logger } from "nodelogger";
import { Order } from "types";

const ORDER_TABLE_NAME = process.env.ORDER_TABLE_NAME ?? "";

// Due to Babel transpiling, extending Error will cause instanceof to not work
// properly.
export class NotFoundError {
  message: string;

  constructor(item = "") {
    this.message = "Item " + item + " not found.";
  }
}

export const getOrders = () => readTable<Order>(ORDER_TABLE_NAME);
export const getOrder = (id: string) =>
  readItem<Order>(ORDER_TABLE_NAME, id, "orderID");

const client = new DynamoDB({ region: process.env.AWS_REGION });

// readTable scans the table for all entries, refusing to read more when the
// queried data exceeds 1MB.
export const readTable = async <T>(tableName: string): Promise<T[]> => {
  const command = new ScanCommand({ TableName: tableName });
  const response = await client.send(command);
  if (response.LastEvaluatedKey) {
    Logger.warn(
      `LastEvaluatedKey was not undefined when querying ${tableName}, dropping additional items`
    );
  }
  if (!response.Items) {
    return [];
  }
  return response.Items.map((item) => unmarshall(item)) as T[];
};

// readItem retrieves the specified item from the table.
export const readItem = async <T>(
  tableName: string,
  key: string,
  keyID = "id"
): Promise<T> => {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: marshall({ [keyID]: key }),
  });
  const response = await client.send(command);
  if (!response.Item) {
    throw new NotFoundError(key);
  }
  return unmarshall(response.Item) as T;
};
