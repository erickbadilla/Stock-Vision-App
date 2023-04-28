import { TNextAPIHandler } from "@/common/utils/api/handler/api-handler";
import * as AlphavantageService from "../../../../../common/lib/alphavantage/alphavantage.service";

interface IBestMatch {
  label: string; //Name of the company
  value: string; //Symbol of the company
}

export type IStockVisionBestMatches = IBestMatch[];

const handler: TNextAPIHandler<IStockVisionBestMatches> = async (req, res) => {
  const searchKey = req.query.search as string;

  switch (req.method) {
    case "GET": {
      const bestMatches = await AlphavantageService.searchBestMatches(
        searchKey
      );

      const data = bestMatches.map((match) => {
        const value = match["1. symbol"];

        const label = `${match["2. name"]} - ${value}`;

        return {
          label,
          value,
        };
      });

      res.status(200).json({
        status: "Success",
        data,
      });
    }

    default: {
      res.status(405);
    }
  }
};

export default handler;
