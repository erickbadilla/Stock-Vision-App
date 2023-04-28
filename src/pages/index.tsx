import Head from "next/head";
import { FunctionComponent, useCallback, useState } from "react";
import {
  ISearchFormOption,
  SearchForm,
} from "@/common/components/search-form/search-form.component";
import { CompanyTable } from "@/dashboard/components/company-table/company-table.component";
import { IStockVisionBestMatches } from "./api/stocks/company/bestmatches/[search]";
import { ISuccessResponse } from "@/common/utils/api/response/api-response";
import {
  IStockVisionCompanyInfo,
  TStockVisionCompaniesInfo,
} from "./api/stocks/company";
import { Box, Tab, Tabs } from "@mui/material";
import { RealtimeStockPrice } from "@/dashboard/components/realtime-stock-price/realtime-stock-price.component";
import { Toaster } from "@/common/components/toaster/toaster.component";
import { useToaster } from "@/common/contexts/toaster/hook/use-toaster.hook";
import styles from "../styles/dashbord.module.css";
import { TabPanel } from "@/common/components/tabs/tab-panel.component";
import { GetServerSideProps } from "next";

//Fetcher for search company form
const fetchCompanies = async (query: string): Promise<ISearchFormOption[]> => {
  const response = await fetch(`/api/stocks/company/bestmatches/${query}`);
  const { data } =
    (await response.json()) as ISuccessResponse<IStockVisionBestMatches>;

  return data;
};

interface IDashboardServerSideProps {
  tableCompanies: IStockVisionCompanyInfo[];
  companiesCache: [string, IStockVisionCompanyInfo][];
  tableCompaniesCache: [string, IStockVisionCompanyInfo][];
}

export const getServerSideProps: GetServerSideProps<
  IDashboardServerSideProps
> = async () => {
  const companiesCache: IDashboardServerSideProps["companiesCache"] = [];
  const tableCompaniesCache: IDashboardServerSideProps["tableCompaniesCache"] =
    [];

  return {
    props: {
      tableCompanies: [],
      companiesCache,
      tableCompaniesCache,
    },
  };
};

const Dashboard: FunctionComponent<IDashboardServerSideProps> = (
  serverSideProps
) => {
  //Used for caching purposes
  const [companiesCache] = useState<Map<string, IStockVisionCompanyInfo>>(
    new Map(serverSideProps.companiesCache)
  );

  //Table Data Store
  const [tableCompaniesMap] = useState<Map<string, IStockVisionCompanyInfo>>(
    new Map(serverSideProps.tableCompaniesCache)
  );

  // Interface for updating table data, small optimization avoids ON + ON -> ON
  const [tableCompanies, setTableCompanies] = useState<
    IStockVisionCompanyInfo[]
  >(serverSideProps.tableCompanies);

  const [currentFormTab, setCurrentFormTab] = useState<number>(0);

  const { addMessage } = useToaster();

  //Not the ideal logic here, we should handle si complex logic on a state manager like Redux
  const handleSelectedFieldsByName = async (
    newCompanies: ISearchFormOption[]
  ) => {
    try {
      const newSymbols = newCompanies.map(({ value }) => value);

      const notSavedCompanies: string[] = [];

      newSymbols.forEach((symbol) => {
        const cachedCompany = companiesCache.get(symbol);

        if (cachedCompany) {
          tableCompaniesMap.set(cachedCompany.tickerSymbol, cachedCompany);

          return setTableCompanies([...tableCompaniesMap.values()]);
        }

        notSavedCompanies.push(symbol);
      });

      if (notSavedCompanies.length === 0) {
        setTableCompanies([...tableCompaniesMap.values()]);
        addMessage({
          severity: "info",
          message: "Companies or company added.",
          durationMs: 4500,
        });
        return;
      }

      const symbolsToQuery = notSavedCompanies.join(",");

      const response = await fetch(
        `api/stocks/company?symbols=${symbolsToQuery}`
      );

      if (!response.ok) {
        throw new Error();
      }

      const { data } =
        (await response.json()) as ISuccessResponse<TStockVisionCompaniesInfo>;

      if (data.length === 0) {
        return;
      }

      data.forEach((companyInfo) => {
        companiesCache.set(companyInfo.tickerSymbol, companyInfo);
        tableCompaniesMap.set(companyInfo.tickerSymbol, companyInfo);
      });

      setTableCompanies([...tableCompaniesMap.values()]);
      addMessage({
        severity: "info",
        message: "Companies or company added.",
        durationMs: 4500,
      });
    } catch (error) {
      addMessage({
        severity: "error",
        message: "Failed to add company or companies.",
        durationMs: 5000,
      });
    }
  };

  const handleCompanyTableRowRemove = useCallback(
    (rowId: string) => {
      const companyToBeRemoved = tableCompaniesMap.get(rowId);

      tableCompaniesMap.delete(rowId);
      setTableCompanies([...tableCompaniesMap.values()]);

      const companyName = `${companyToBeRemoved!.tickerSymbol} - ${
        companyToBeRemoved!.companyName
      } `;

      addMessage({
        message: `${companyName} company removed.`,
        severity: "warning",
        durationMs: 5000,
      });
    },
    [addMessage, tableCompaniesMap]
  );

  const handleSelectCurrentTab = (_: unknown, value: number) => {
    setCurrentFormTab(value);
  };

  const symbols = tableCompanies.map(({ tickerSymbol }) => tickerSymbol);

  return (
    <>
      <Head>
        <title>Stock Vision</title>
        <meta
          name="description"
          content="A Stock Visualization App, Stock Vision."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <CompanyTable
          data={tableCompanies}
          onRowDelete={handleCompanyTableRowRemove}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentFormTab} onChange={handleSelectCurrentTab}>
            <Tab label="Company Search" />
            <Tab label="Stock Price Search" />
          </Tabs>

          <TabPanel index={0} value={currentFormTab}>
            <SearchForm
              searchLabel="Search by Company Name or Ticker"
              matchingFieldsLabel=" Matching Companies:"
              addSelectedFieldsLabel="Add Selected Companies"
              fetcherProvider={fetchCompanies}
              onSelectedFields={handleSelectedFieldsByName}
            />
          </TabPanel>

          <TabPanel index={1} value={currentFormTab}>
            {/* Not implemented, theres no easy access endpoint to query this */}
            <SearchForm
              searchLabel="Search by Stock Price"
              matchingFieldsLabel=" Matching Companies:"
              addSelectedFieldsLabel="Add Selected Companies"
              fetcherProvider={fetchCompanies}
              onSelectedFields={console.log}
              isNumericSearch
            />
          </TabPanel>
        </Box>

        <div className={styles.lineChartContainer}>
          <RealtimeStockPrice symbols={symbols} />
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default Dashboard;
