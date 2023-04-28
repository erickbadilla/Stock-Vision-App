import { TNextAPIHandler } from "@/common/utils/api/handler/api-handler";
import * as AlphavantageService from "../../../../common/lib/alphavantage/alphavantage.service";

export interface IStockVisionCompanyInfo {
  id: string;
  companyName: string;
  tickerSymbol: string;
  listedSince: string;
  marketCapitalization: number;
  paysDividends: boolean;
  stockPrice: number;
}

export type TStockVisionCompaniesInfo = IStockVisionCompanyInfo[];

const handler: TNextAPIHandler<TStockVisionCompaniesInfo> = async (
  req,
  res
) => {
  switch (req.method) {
    case "GET": {
      const { symbols: symbolsQuery } = req.query;

      const symbols = symbolsQuery
        ?.toString()
        .split(",")
        .filter((value) => value)
        .map((symbol) => symbol.trim());

      if (!symbols?.length) {
        return res.status(404).json({
          status: "Failure",
          message: "Please provide symbols",
        });
      }

      const companiesSearchPromises = symbols.map(async (symbol) =>
        AlphavantageService.searchCompanyBySymbol(symbol)
      );

      const alphavangeCompanies = await Promise.all(companiesSearchPromises);

      const mappedCompanies: TStockVisionCompaniesInfo = [];

      for (const companyOverview of alphavangeCompanies) {
        const { Symbol, Name, MarketCapitalization, DividendPerShare } =
          companyOverview;

        if (!Symbol) {
          continue;
        }

        const mappedCompany: IStockVisionCompanyInfo = {
          id: Symbol,
          companyName: Name,
          tickerSymbol: Symbol,
          listedSince: "",
          marketCapitalization: Number(MarketCapitalization),
          paysDividends: Number(DividendPerShare) > 0,
          stockPrice: Number(companyOverview["50DayMovingAverage"] ?? "0"),
        };

        mappedCompanies.push(mappedCompany);
      }

      res.status(200).json({
        status: "Success",
        data: mappedCompanies,
      });
    }

    default: {
      res.status(405);
    }
  }
};

export default handler;
