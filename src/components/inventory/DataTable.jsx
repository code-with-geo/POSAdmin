import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import ActionButton from "./ActionButton";
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { useCookies } from "react-cookie";
import { apiURL } from "../../hooks/Users";
import { useParams } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const TableColumns = [
  {
    field: "InventoryId",
    headerName: "Inventory ID",
    flex: 1,
    resizable: false,
    headerClassName: "theme-header",
  },
  {
    field: "Id",
    headerName: "Product Id",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Barcode",
    headerName: "Barcode",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "ProductName",
    headerName: "Product Name",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Specification",
    headerName: "Specification",
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
  const [products, setProducts] = useState([]);
  const [connection, setConnection] = useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const api = apiURL();
  const { id } = useParams();
  useEffect(() => {
    // Fetch initial product list with Authorization header
    axios
      .get(`${api}/api/inventory/all?locationId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
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
      .get(`${api}/api/inventory/get/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  console.log(products);

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
          getRowId={(row) => row.InventoryId}
          columns={TableColumns}
          rows={products != null && products}
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
