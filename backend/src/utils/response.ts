import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: Pagination;
  error?: unknown;
};

export function sendResponse<T>(
  c: Context,
  status: ContentfulStatusCode,
  success: boolean,
  message: string,
  data?: T,
  error?: unknown,
  pagination?: Pagination
) {
  const response: ApiResponse<T> = {
    success,
    message,
  };

  if (data !== undefined) response.data = data;
  if (error !== undefined) response.error = error;
  if (pagination !== undefined) response.pagination = pagination;

  return c.json(response, status);
}
