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
    field: "Id",
    headerName: "ID",
    flex: 1,
    resizable: false,
    headerClassName: "theme-header",
  },
  {
    field: "Name",
    headerName: "Name",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "Description",
    headerName: "Description",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "WholesalePrice",
    headerName: "Wholesale Price",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "RetailPrice",
    headerName: "Retail Price",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "SupplierPrice",
    headerName: "Supplier Price",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "ReorderLevel",
    headerName: "Reorder Level",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
  },
  {
    field: "IsVat",
    headerName: "Vat",
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
    field: "Category", // New field for Category.Name
    headerName: "Category Name",
    flex: 1,
    headerClassName: "theme-header",
    resizable: false,
    valueGetter: (params) => {
      if (!params?.Name) {
        return "N/A"; // Default value if Category is not available
      }
      return params.Name;
    },
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

  useEffect(() => {
    // Fetch initial product list with Authorization header
    axios
      .get(`${api}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    // Initialize SignalR connection
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${api}/hubs/products`, {
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
      .get(`${api}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
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
          getRowId={(row) => row.Id}
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
