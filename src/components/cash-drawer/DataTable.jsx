import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { useCookies } from "react-cookie";
import { apiURL } from "../../hooks/Users";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TableColumns = [
  {
    field: "DrawerId",
    headerName: "Drawer ID",
    flex: 1,
    resizable: false,
    headerClassName: "theme-header",
  },
  {
    field: "Cashier",
    headerName: "Cashier",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "InitialCash",
    headerName: "Initial Cash",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "TotalSales",
    headerName: "Total Sales",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Withdrawals",
    headerName: "Withdrawals",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Expense",
    headerName: "Expense",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "DrawerCash",
    headerName: "Drawer Cash",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "TimeStart",
    headerName: "Time Start",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
    valueGetter: (params) => {
      if (params === 1) {
        return "Enable"; // Display "Enable" when Status = 1
      }
      return "Disable"; // Display "Disable" otherwise
    },
  },
  {
    field: "DateCreated",
    headerName: "Date Created",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
    renderCell: (params) => <ActionButton {...{ params }} />,
  },
];

const DataTable = () => {
  const [cashDrawer, setCashDrawer] = useState([]);
  const [connection, setConnection] = useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const api = apiURL();

  useEffect(() => {
    axios
      .get(`${api}/api/cashdrawer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCashDrawer(response.data))
      .catch((error) => console.error("Error fetching cash drawer:", error));

    // Initialize SignalR connection
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${api}/hubs/cashdrawer`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        hubConnection.on("ReceiveMessage", (message) => {
          fetchCashDrawer();
        });
      })
      .catch((error) =>
        console.error("Error connecting to SignalR hub:", error)
      );

    setConnection(hubConnection);

    return () => {
      hubConnection.stop();
    };
  }, [token]);

  const fetchCashDrawer = () => {
    axios
      .get(`${api}/api/cashdrawer`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCashDrawer(response.data))
      .catch((error) => console.error("Error fetching cash drawer:", error));
  };

  return (
    <>
      <PageContainer>
        <DataGrid
          sx={{
            fontSize: "12px",
            overflowX: "auto",
            "& .theme-header": {
              backgroundColor: "#1e201e",
              color: "#fff",

              ":hover": { color: "#fff" },
            },
            "& .css-ptiqhd-MuiSvgIcon-root": {
              color: "#fff",
            },
          }}
          getRowId={(row) => row.DrawerId}
          columns={TableColumns}
          rows={cashDrawer != null && cashDrawer}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </PageContainer>
    </>
  );
};

export default DataTable;
