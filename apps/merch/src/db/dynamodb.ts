import {
  DynamoDB,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
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

// writeItem adds the given item to the specified DynamoDB table
export const writeItem = async <T>(
  tableName: string,
  item: T
): Promise<void> => {
  const command = new PutItemCommand({
    TableName: tableName,
    Item: marshall(item),
  });
  try {
    await client.send(command);
  } catch (error: any) {
    if (error.code === 'ConditionalCheckFailedException') {
      Logger.warn(`Item already exists in table ${tableName}`);
      return;
    }
    throw error;
  }
};

// updateItem updates the specified item in the table.
export const updateItem = async (
  tableName: string,
  key: string,
  updateExpression?: string,
  conditionExpression?: string,
  expressionAttributeValues?: Record<string, any>,
  expressionAttributeNames?: Record<string, string>,
  keyID = "id"
): Promise<void> => {
  const command = new UpdateItemCommand({
    TableName: tableName,
    Key: marshall({ [keyID]: key }),
    ConditionExpression: conditionExpression,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
    ExpressionAttributeNames: expressionAttributeNames,
  });
  try {
    await client.send(command);
  } catch (error: any) {
    if (error.code === "ConditionalCheckFailedException") {
      Logger.warn(`Item does not exist in table ${tableName}`);
      return;
    }
    throw error;
  }
};
