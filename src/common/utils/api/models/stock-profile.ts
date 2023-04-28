export type Root = Root2[];

export interface Root2 {
  ask: number;
  askSize: number;
  averageDailyVolume10Day: number;
  averageDailyVolume3Month: number;
  bid: number;
  bidSize: number;
  bookValue: number;
  currency: string;
  dividendDate: DividendDate;
  earningsTimestamp: EarningsTimestamp;
  earningsTimestampStart: EarningsTimestampStart;
  earningsTimestampEnd: EarningsTimestampEnd;
  epsForward: number;
  epsTrailingTwelveMonths: number;
  exchange: string;
  exchangeDataDelayedBy: number;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  financialCurrency: string;
  forwardPE: number;
  fullExchangeName: string;
  gmtOffSetMilliseconds: number;
  language: string;
  longName: string;
  market: string;
  marketCap: number;
  marketState: string;
  messageBoardId: string;
  postMarketChange: number;
  postMarketChangePercent: number;
  postMarketPrice: number;
  postMarketTime: PostMarketTime;
  priceHint: number;
  priceToBook: number;
  quoteSourceName: string;
  quoteType: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketOpen: number;
  regularMarketPreviousClose: number;
  regularMarketPrice: number;
  regularMarketTime: RegularMarketTime;
  regularMarketVolume: number;
  sharesOutstanding: number;
  shortName: string;
  sourceInterval: number;
  symbol: string;
  tradeable: boolean;
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;
  trailingPE: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
}

export interface DividendDate {
  timestamp: number;
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface EarningsTimestamp {
  timestamp: number;
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface EarningsTimestampStart {
  timestamp: number;
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface EarningsTimestampEnd {
  timestamp: number;
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface PostMarketTime {
  timestamp: number;
  date: string;
  timezone_type: number;
  timezone: string;
}

export interface RegularMarketTime {
  timestamp: number;
  date: string;
  timezone_type: number;
  timezone: string;
}
