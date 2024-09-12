import mongoose, { Model, Document, FilterQuery } from "mongoose";
import { Logger } from "nodelogger";

export class NotFoundError {
  message: string;
  constructor(item = "") {
    this.message = "Item " + item + " not found.";
  }
}

// readTable scans the table for all entries
export const readTable = async<T extends Document>(model: Model<T>): Promise<T[]> => {
  const response = await model.find().exec();
  if (!response) {
    return [];
  }
  return response as T[];
};

// readItem retrieves the specified item from the table.
export const readItem = async <T extends Document>(
  model: Model<T>,
  key: string,
  keyId = "id"
): Promise<T> => {
  const query: FilterQuery<T> = { [keyId]: key } as FilterQuery<T>;
  const response = await model.findOne(query).exec();
  if (!response) {
    Logger.warn(`Item does not exist in table ${model.modelName}`);
    throw new NotFoundError(key);
  }
  return response as T;
};

// writeItem adds the given item to the specified model table.
export const writeItem = async <T extends Document>(
  model: Model<T>,
  item: T
): Promise<T | null> => {
  try {
    return await model.create(item);
  } catch (error) {
    const errorMessage = (error as Error).message
    Logger.error(`An error occurred: ${errorMessage}`);
    return null;
  }
};

export const setupDb = async (): Promise<void> => {
  try {
    const mongoDb = process.env.MONGODB_URI ?? "";
    await mongoose.connect(mongoDb);
    Logger.info("Database connected successfully");
  } catch (error) {
    const errorMessage = (error as Error).message
    Logger.error(`Database connection error: ${errorMessage}`);
  }
};