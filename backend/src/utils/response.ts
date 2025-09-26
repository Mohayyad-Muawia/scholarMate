import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
};

export function sendResponse<T>(
  c: Context,
  status: ContentfulStatusCode,
  success: boolean,
  message: string,
  data?: T,
  error?: any
) {
  const response: ApiResponse<T> = {
    success,
    message,
  };

  if (data !== undefined) response.data = data;
  if (error !== undefined) response.error = error;

  return c.json(response, status);
}
