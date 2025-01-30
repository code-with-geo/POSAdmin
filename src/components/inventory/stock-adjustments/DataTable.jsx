import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { useCookies } from "react-cookie";
import { apiURL } from "../../../hooks/Users";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TableColumns = [
  {
    field: "AdjustmentId",
    headerName: "Adjustment ID",
    flex: 1,
    resizable: false,
    headerClassName: "theme-header",
  },
  {
    field: "ProductName",
    headerName: "Product Name",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Units",
    headerName: "Units",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Reason",
    headerName: "Reason",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "UserName",
    headerName: "User",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Actions",
    headerName: "Actions",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
    valueGetter: (params) => {
      if (params === 0) {
        return "Add to Inventory"; // Display "Enable" when Status = 1
      }
      return "Remove from Inventory"; // Display "Disable" otherwise
    },
  },
];

const DataTable = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [connection, setConnection] = useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const api = apiURL();

  useEffect(() => {
    // Fetch initial product list with Authorization header
    axios
      .get(`${api}/api/stock-adjustments/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAdjustments(response.data.Data))
      .catch((error) => console.error("Error fetching products:", error));

    // Initialize SignalR connection
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${api}/hubs/inventory`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub!");

        // Listen for product updates
        hubConnection.on("ReceiveMessage", (message) => {
          console.log("SignalR message received:", message);
          fetchProducts(); // Fetch updated products
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

  const fetchProducts = () => {
    axios
      .get(`${api}/api/stock-adjustments/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setAdjustments(response.data.Data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  console.log(adjustments);

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
          getRowId={(row) => row.AdjustmentId}
          columns={TableColumns}
          rows={adjustments != null && adjustments}
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
