import { NextApiRequest, NextApiResponse } from "next";
import { TAPIResponse } from "../response/api-response";

export type TNextAPIHandler<T = void> = (
  req: NextApiRequest,
  res: NextApiResponse<TAPIResponse<T>>
) => Promise<void>;
