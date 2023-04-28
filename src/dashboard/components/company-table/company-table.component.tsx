import { FunctionComponent, useMemo } from "react";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridSortDirection,
  GridSortModel,
} from "@mui/x-data-grid";
import { TStockVisionCompaniesInfo } from "@/pages/api/stocks/company";
import { Button } from "@mui/material";

interface ICompanyTableProps {
  data: TStockVisionCompaniesInfo;
  onRowDelete?: (rowId: string) => void;
}

const createCompanyTableColumns = (
  onRowDelete?: (rowId: string) => void
): GridColDef[] => {
  const columns: GridColDef[] = [
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "tickerSymbol", headerName: "Ticker Symbol", flex: 1 },
    { field: "listedSince", headerName: "Listed Since", flex: 1, type: "date" },
    {
      field: "marketCapitalization",
      headerName: "Market Cap",
      flex: 1,
      type: "number",
    },
    {
      field: "paysDividends",
      headerName: "Pays Dividends",
      flex: 1,
      type: "boolean",
    },
    { field: "stockPrice", headerName: "Stock Price", flex: 1, type: "number" },
  ];

  if (onRowDelete) {
    const deleteRow: GridColDef = {
      field: "delete",
      headerName: "",
      width: 90,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onRowDelete(params.id as string)}
        >
          Delete
        </Button>
      ),
    };
    columns.push(deleteRow);
  }

  return columns;
};

const sortingOrder: GridSortDirection[] = ["asc", "desc"];
const sortingModel: GridSortModel = [
  {
    field: "stockPrice",
    sort: "asc",
  },
];

const gridPaginationModel: GridPaginationModel = {
  page: 0,
  pageSize: 8,
};

const pageSizeOptions: number[] = [8];

export const CompanyTable: FunctionComponent<ICompanyTableProps> = ({
  data = [],
  onRowDelete,
}) => {
  const columns = useMemo(() => {
    return createCompanyTableColumns(onRowDelete);
  }, [onRowDelete]);

  return (
    <DataGrid
      rows={data}
      columns={columns}
      paginationModel={gridPaginationModel}
      sortingMode="client"
      sortingOrder={sortingOrder}
      rowSelection={true}
      sortModel={sortingModel}
      pageSizeOptions={pageSizeOptions}
    />
  );
};
