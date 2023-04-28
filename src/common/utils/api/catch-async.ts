import { APIError } from "./error/api-error";
import { TNextAPIHandler } from "./handler/api-handler";

export const catchAsync =
  <T extends TNextAPIHandler<any>>(
    handler: T
  ): TNextAPIHandler<Parameters<T>[1]> =>
  (req, res) =>
    handler(req, res).catch((error) => {
      if (error instanceof APIError) {
        res.status(error.statusCode).json(error.format());
        return;
      }

      const defaultError = new APIError(
        "Internal Server Error",
        "Something went wrong, please try again later.",
        500
      );

      res.status(defaultError.statusCode).json(defaultError.format());
    });
