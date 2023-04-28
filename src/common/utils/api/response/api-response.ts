interface IBaseAPIResponse {
  status: "Success" | "Failure";
  title?: string;
  message?: string;
}

export interface ISuccessResponse<T> extends IBaseAPIResponse {
  status: "Success";
  data: T extends void ? never : T;
  size?: T extends any[] ? number : never;
}

export interface IFailureResponse extends IBaseAPIResponse {
  status: "Failure";
  stack?: string; //Development do not leak this production.
}

export type TAPIResponse<T = void> = ISuccessResponse<T> | IFailureResponse;
