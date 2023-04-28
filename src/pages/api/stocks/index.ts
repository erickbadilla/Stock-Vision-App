import { TNextAPIHandler } from "@/common/utils/api/handler/api-handler";
import * as AlphavantageService from "../../../common/lib/alphavantage/alphavantage.service";

// Helper function to generate random colors
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface IDataset {
  label: string;
  borderColor: string;
  fill: boolean;
  data: {
    x: string;
    y: number;
  }[];
  tension: number;
}

export interface IRealtimeData {
  labels: string[];
  datasets: IDataset[];
}

const handler: TNextAPIHandler<IRealtimeData> = async (req, res) => {
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
          message: "Please enter symbols to track stock prices.",
        });
      }

      const realTimeStocksPromises = symbols.map(
        AlphavantageService.realTimeStockPricesBySymbol
      );

      const stockPrices = await Promise.all(realTimeStocksPromises);

      if ((stockPrices[0] as unknown as Record<string, unknown>)?.Note) {
        return res.status(500).json({
          status: "Failure",
          message: "Endpoint limit reached.",
        });
      }

      const stockPricesData = stockPrices.map((stockPrice) => {
        const timeSeriesData = stockPrice["Time Series (5min)"];

        const stockPrices = Object.entries(timeSeriesData).map(
          ([timeString, data]) => {
            return {
              x: timeString,
              y: parseFloat(data["4. close"]),
            };
          }
        );

        return {
          symbol: stockPrice["Meta Data"]["2. Symbol"],
          prices: stockPrices,
        };
      });

      const response: IRealtimeData = {
        labels: stockPricesData[0]?.prices.map(({ x }) => x),
        datasets: stockPricesData.map((data) => {
          return {
            label: data.symbol,
            data: data.prices,
            fill: false,
            borderColor: getRandomColor(),
            tension: 0.1,
          };
        }),
      };

      res.status(200).json({
        status: "Success",
        data: response,
      });
    }

    default: {
      res.status(405);
    }
  }
};

export default handler;
