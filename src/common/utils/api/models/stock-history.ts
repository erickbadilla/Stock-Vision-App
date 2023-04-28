export interface Root {
  meta: Meta;
  items: Items;
  error: any;
}

export interface Meta {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  dataGranularity: string;
  range: string;
}

export interface Items { 
  [x: string]: StockHistory;
}

export interface StockHistory {
  date: string;
  date_utc: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}
