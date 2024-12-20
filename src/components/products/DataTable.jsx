import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Component.styled";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
} from "@mui/material";
import ActionButton from "./ActionButton";
import { RowingOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const ResponsiveTableContainer = styled(TableContainer)`
  overflow-x: auto;
  width: 100%;
`;

const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-head {
    background-color: #1e201e;
    color: white;
    font-weight: 500;
    font-size: 12px;
  }
`;

const DataTable = () => {
  const rows = [
    {
      itemID: 1,
      barcode: "102142321412",
      name: "Test Product 1",
      description: "Sample Product 1",
      supplierPrice: 200,
      retailPrice: 250,
      wholeSalePrice: 180,
      reorderLevel: "10",
      remarks: "Popular Item",
    },
    {
      itemID: 2,
      barcode: "102142321413",
      name: "Test Product 2",
      description: "Sample Product 2",
      supplierPrice: 150,
      retailPrice: 220,
      wholeSalePrice: 140,
      reorderLevel: "15",
      remarks: "Fast Selling",
    },
    {
      itemID: 3,
      barcode: "102142321414",
      name: "Test Product 3",
      description: "Sample Product 3",
      supplierPrice: 300,
      retailPrice: 350,
      wholeSalePrice: 280,
      reorderLevel: "8",
      remarks: "Seasonal",
    },
    {
      itemID: 4,
      barcode: "102142321415",
      name: "Test Product 4",
      description: "Sample Product 4",
      supplierPrice: 120,
      retailPrice: 180,
      wholeSalePrice: 110,
      reorderLevel: "20",
      remarks: "Clearance",
    },
    {
      itemID: 5,
      barcode: "102142321416",
      name: "Test Product 5",
      description: "Sample Product 5",
      supplierPrice: 220,
      retailPrice: 270,
      wholeSalePrice: 200,
      reorderLevel: "12",
      remarks: "High Demand",
    },
    {
      itemID: 6,
      barcode: "102142321417",
      name: "Test Product 6",
      description: "Sample Product 6",
      supplierPrice: 175,
      retailPrice: 230,
      wholeSalePrice: 160,
      reorderLevel: "18",
      remarks: "Top Seller",
    },
    {
      itemID: 7,
      barcode: "102142321418",
      name: "Test Product 7",
      description: "Sample Product 7",
      supplierPrice: 250,
      retailPrice: 300,
      wholeSalePrice: 240,
      reorderLevel: "10",
      remarks: "New Arrival",
    },
    {
      itemID: 8,
      barcode: "102142321419",
      name: "Test Product 8",
      description: "Sample Product 8",
      supplierPrice: 190,
      retailPrice: 260,
      wholeSalePrice: 180,
      reorderLevel: "25",
      remarks: "Restock Needed",
    },
    {
      itemID: 9,
      barcode: "102142321420",
      name: "Test Product 9",
      description: "Sample Product 9",
      supplierPrice: 300,
      retailPrice: 380,
      wholeSalePrice: 290,
      reorderLevel: "5",
      remarks: "Limited Edition",
    },
    {
      itemID: 10,
      barcode: "102142321421",
      name: "Test Product 10",
      description: "Sample Product 10",
      supplierPrice: 100,
      retailPrice: 150,
      wholeSalePrice: 90,
      reorderLevel: "30",
      remarks: "Budget Item",
    },
    {
      itemID: 11,
      barcode: "102142321422",
      name: "Test Product 11",
      description: "Sample Product 11",
      supplierPrice: 275,
      retailPrice: 350,
      wholeSalePrice: 260,
      reorderLevel: "7",
      remarks: "Customer Favorite",
    },
    {
      itemID: 12,
      barcode: "102142321423",
      name: "Test Product 12",
      description: "Sample Product 12",
      supplierPrice: 210,
      retailPrice: 280,
      wholeSalePrice: 200,
      reorderLevel: "10",
      remarks: "Discount Item",
    },
    {
      itemID: 13,
      barcode: "102142321424",
      name: "Test Product 13",
      description: "Sample Product 13",
      supplierPrice: 160,
      retailPrice: 220,
      wholeSalePrice: 150,
      reorderLevel: "15",
      remarks: "High Stock",
    },
    {
      itemID: 14,
      barcode: "102142321425",
      name: "Test Product 14",
      description: "Sample Product 14",
      supplierPrice: 195,
      retailPrice: 250,
      wholeSalePrice: 180,
      reorderLevel: "20",
      remarks: "Best Value",
    },
    {
      itemID: 15,
      barcode: "102142321426",
      name: "Test Product 15",
      description: "Sample Product 15",
      supplierPrice: 145,
      retailPrice: 200,
      wholeSalePrice: 130,
      reorderLevel: "12",
      remarks: "Low Stock",
    },
    {
      itemID: 16,
      barcode: "102142321427",
      name: "Test Product 16",
      description: "Sample Product 16",
      supplierPrice: 330,
      retailPrice: 400,
      wholeSalePrice: 320,
      reorderLevel: "8",
      remarks: "Premium Item",
    },
    {
      itemID: 17,
      barcode: "102142321428",
      name: "Test Product 17",
      description: "Sample Product 17",
      supplierPrice: 260,
      retailPrice: 320,
      wholeSalePrice: 240,
      reorderLevel: "10",
      remarks: "Featured Product",
    },
    {
      itemID: 18,
      barcode: "102142321429",
      name: "Test Product 18",
      description: "Sample Product 18",
      supplierPrice: 135,
      retailPrice: 180,
      wholeSalePrice: 120,
      reorderLevel: "25",
      remarks: "Fast Selling",
    },
    {
      itemID: 19,
      barcode: "102142321430",
      name: "Test Product 19",
      description: "Sample Product 19",
      supplierPrice: 280,
      retailPrice: 350,
      wholeSalePrice: 270,
      reorderLevel: "5",
      remarks: "Exclusive",
    },
    {
      itemID: 20,
      barcode: "102142321431",
      name: "Test Product 20",
      description: "Sample Product 20",
      supplierPrice: 110,
      retailPrice: 160,
      wholeSalePrice: 100,
      reorderLevel: "30",
      remarks: "Budget Item",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const navigate = useNavigate();

  return (
    <PageContainer>
      <ResponsiveTableContainer component={Paper}>
        <Table aria-label="Product Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell>Barcode</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Supplier Price</StyledTableCell>
              <StyledTableCell>Retail Price</StyledTableCell>
              <StyledTableCell>Whole Sale Price</StyledTableCell>
              <StyledTableCell>Reorder Level</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.itemID}>
                <TableCell>{row.itemID}</TableCell>
                <TableCell>{row.barcode}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.supplierPrice}</TableCell>
                <TableCell>{row.retailPrice}</TableCell>
                <TableCell>{row.wholeSalePrice}</TableCell>
                <TableCell>{row.reorderLevel}</TableCell>
                <TableCell>{row.remarks}</TableCell>
                <TableCell>
                  <Button>
                    <ActionButton />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ResponsiveTableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />
    </PageContainer>
  );
};

export default DataTable;
