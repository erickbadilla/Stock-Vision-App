export interface StockCombine {
  assetProfile: AssetProfile;
  earnings: Earnings;
  financialData: FinancialData;
}

export interface AssetProfile {
  address1: string;
  auditRisk: number;
  boardRisk: number;
  city: string;
  companyOfficers: CompanyOfficer[];
  compensationAsOfEpochDate: number;
  compensationRisk: number;
  country: string;
  fullTimeEmployees: number;
  governanceEpochDate: number;
  industry: string;
  longBusinessSummary: string;
  maxAge: number;
  overallRisk: number;
  phone: string;
  sector: string;
  shareHolderRightsRisk: number;
  state: string;
  website: string;
  zip: string;
}

export interface CompanyOfficer {
  age?: number;
  exercisedValue: ExercisedValue;
  fiscalYear?: number;
  maxAge: number;
  name: string;
  title: string;
  totalPay?: TotalPay;
  unexercisedValue: UnexercisedValue;
  yearBorn?: number;
}

export interface ExercisedValue {
  fmt: any;
  longFmt: string;
  raw: number;
}

export interface TotalPay {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface UnexercisedValue {
  fmt: any;
  longFmt: string;
  raw: number;
}

export interface Earnings {
  earningsChart: EarningsChart;
  financialCurrency: string;
  financialsChart: FinancialsChart;
  maxAge: number;
}

export interface EarningsChart {
  currentQuarterEstimate: CurrentQuarterEstimate;
  currentQuarterEstimateDate: string;
  currentQuarterEstimateYear: number;
  earningsDate: EarningsDate[];
  quarterly: Quarterly[];
}

export interface CurrentQuarterEstimate {
  fmt: string;
  raw: number;
}

export interface EarningsDate {
  fmt: string;
  raw: number;
}

export interface Quarterly {
  actual: Actual;
  date: string;
  estimate: Estimate;
}

export interface Actual {
  fmt: string;
  raw: number;
}

export interface Estimate {
  fmt: string;
  raw: number;
}

export interface FinancialsChart {
  quarterly: Quarterly2[];
  yearly: Yearly[];
}

export interface Quarterly2 {
  date: string;
  earnings: Earnings2;
  revenue: Revenue;
}

export interface Earnings2 {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface Revenue {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface Yearly {
  date: number;
  earnings: Earnings3;
  revenue: Revenue2;
}

export interface Earnings3 {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface Revenue2 {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface FinancialData {
  currentPrice: CurrentPrice;
  currentRatio: CurrentRatio;
  debtToEquity: DebtToEquity;
  earningsGrowth: EarningsGrowth;
  ebitda: Ebitda;
  ebitdaMargins: EbitdaMargins;
  financialCurrency: string;
  freeCashflow: FreeCashflow;
  grossMargins: GrossMargins;
  grossProfits: GrossProfits;
  maxAge: number;
  numberOfAnalystOpinions: NumberOfAnalystOpinions;
  operatingCashflow: OperatingCashflow;
  operatingMargins: OperatingMargins;
  profitMargins: ProfitMargins;
  quickRatio: QuickRatio;
  recommendationKey: string;
  recommendationMean: RecommendationMean;
  returnOnAssets: ReturnOnAssets;
  returnOnEquity: ReturnOnEquity;
  revenueGrowth: RevenueGrowth;
  revenuePerShare: RevenuePerShare;
  targetHighPrice: TargetHighPrice;
  targetLowPrice: TargetLowPrice;
  targetMeanPrice: TargetMeanPrice;
  targetMedianPrice: TargetMedianPrice;
  totalCash: TotalCash;
  totalCashPerShare: TotalCashPerShare;
  totalDebt: TotalDebt;
  totalRevenue: TotalRevenue;
}

export interface CurrentPrice {
  fmt: string;
  raw: number;
}

export interface CurrentRatio {
  fmt: string;
  raw: number;
}

export interface DebtToEquity {
  fmt: string;
  raw: number;
}

export interface EarningsGrowth {
  fmt: string;
  raw: number;
}

export interface Ebitda {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface EbitdaMargins {
  fmt: string;
  raw: number;
}

export interface FreeCashflow {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface GrossMargins {
  fmt: string;
  raw: number;
}

export interface GrossProfits {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface NumberOfAnalystOpinions {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface OperatingCashflow {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface OperatingMargins {
  fmt: string;
  raw: number;
}

export interface ProfitMargins {
  fmt: string;
  raw: number;
}

export interface QuickRatio {
  fmt: string;
  raw: number;
}

export interface RecommendationMean {
  fmt: string;
  raw: number;
}

export interface ReturnOnAssets {
  fmt: string;
  raw: number;
}

export interface ReturnOnEquity {
  fmt: string;
  raw: number;
}

export interface RevenueGrowth {
  fmt: string;
  raw: number;
}

export interface RevenuePerShare {
  fmt: string;
  raw: number;
}

export interface TargetHighPrice {
  fmt: string;
  raw: number;
}

export interface TargetLowPrice {
  fmt: string;
  raw: number;
}

export interface TargetMeanPrice {
  fmt: string;
  raw: number;
}

export interface TargetMedianPrice {
  fmt: string;
  raw: number;
}

export interface TotalCash {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface TotalCashPerShare {
  fmt: string;
  raw: number;
}

export interface TotalDebt {
  fmt: string;
  longFmt: string;
  raw: number;
}

export interface TotalRevenue {
  fmt: string;
  longFmt: string;
  raw: number;
}
