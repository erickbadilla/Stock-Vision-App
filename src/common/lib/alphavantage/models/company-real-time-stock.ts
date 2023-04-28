export interface ICompanyRealTimeStock {
  "Meta Data": MetaData;
  "Time Series (5min)": TimeSeries;
}

export interface MetaData {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Interval": string;
  "5. Output Size": string;
  "6. Time Zone": string;
}

export interface TimeSeries {
  [date: string]: Price;
}

export interface Price {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}
