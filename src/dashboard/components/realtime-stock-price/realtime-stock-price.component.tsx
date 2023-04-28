import { ISuccessResponse } from "@/common/utils/api/response/api-response";
import { IRealtimeData } from "@/pages/api/stocks";
import { FunctionComponent, useMemo } from "react";
import useSWR from "swr";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useToaster } from "@/common/contexts/toaster/hook/use-toaster.hook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IRealTimeStockPriceProps {
  symbols: string[];
}

const fetcher = async (url: string) =>
  fetch(url)
    .then(
      (response) => response.json() as Promise<ISuccessResponse<IRealtimeData>>
    )
    .then(({ data }) => data);

export const RealtimeStockPrice: FunctionComponent<
  IRealTimeStockPriceProps
> = ({ symbols }) => {
  const { addMessage } = useToaster();

  const symbolsQuery = useMemo(() => {
    return symbols.join(",");
  }, [symbols]);

  //Refreshes every 5 minutes to avoid api limit.
  const { data } = useSWR(`api/stocks?symbols=${symbolsQuery}`, fetcher, {
    refreshInterval: 300000,
    fallbackData: {
      labels: [],
      datasets: [],
    },
    onError: () => {
      addMessage({
        severity: "error",
        message:
          "Failed to retrieve real time stock data from the selected companies.",
        durationMs: 5000,
      });
    },
  });

  return <Line data={data} />;
};
