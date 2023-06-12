import { Error } from "types";

export interface Request<T extends string = never> {
  body: unknown,
  params: Record<T, string>,
}

export interface JSONResponse<T> {
  status: (code: number) => JSONResponse<T>,
  json: (response: T|Error) => void,
}
