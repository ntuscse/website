import { APIError } from "types";

export interface Request<T extends string = never> {
  body: unknown,
  params: Record<T, string>,
}

export interface Response<T> {
  status: (code: number) => Response<T>,
  json: (response: T|APIError) => void,
}
