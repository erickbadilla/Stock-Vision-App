import { IAlphavantageCompanySearch } from "./models/company-best-matches";
import { ICompanyOverview } from "./models/company-overview";
import { ICompanyRealTimeStock } from "./models/company-real-time-stock";

const createAlphavangeQuery = (query: string) => {
  return `https://www.alphavantage.co/query?${query}&apikey={process.env.ALPHAVANTAGE_KEY}`;
};

const getFetcher = async (fullQuery: string) => {
  const response = await fetch(fullQuery);

  if (!response.ok) {
    throw new Error("Response error.");
  }

  return await response.json();
};

export const searchBestMatches = async (searchKey: string) => {
  try {
    const query = createAlphavangeQuery(
      `function=SYMBOL_SEARCH&keywords=${searchKey}`
    );

    const data = (await getFetcher(query)) as IAlphavantageCompanySearch;

    return data.bestMatches;
  } catch (error) {
    throw new Error("Failed to fetch best matches");
  }
};

export const searchCompanyBySymbol = async (symbol: string) => {
  try {
    const query = createAlphavangeQuery(`function=OVERVIEW&symbol=${symbol}`);

    return (await getFetcher(query)) as ICompanyOverview;
  } catch (error) {
    throw new Error("Failed to fetch company by symbol.");
  }
};

export const realTimeStockPricesBySymbol = async (symbol: string) => {
  try {
    const query = createAlphavangeQuery(
      `function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min`
    );

    return (await getFetcher(query)) as ICompanyRealTimeStock;
  } catch (error) {
    throw new Error("Failed to fetch realtime stock price.");
  }
};
