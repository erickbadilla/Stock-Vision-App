import { StatusCodes } from "http-status-codes";
import { IFailureResponse } from "../response/api-response";

export class APIError extends Error {
  public title: string;
  public statusCode: number;

  constructor(title: string, message: string, statusCode: StatusCodes) {
    super(message);
    this.title = title;
    this.statusCode = statusCode;
  }

  format(): IFailureResponse {
    const ENVIRONMENT = process.env.NODE_ENV;

    switch (ENVIRONMENT) {
      case "development": {
        return {
          status: "Failure",
          title: this.title,
          message: this.message,
          stack: this.stack,
        };
      }
      case "production": {
        return {
          status: "Failure",
          title: this.title,
          message: this.message,
        };
      }

      default: {
        return {
          status: "Failure",
          title: this.title,
          message: this.message,
        };
      }
    }
  }
}
