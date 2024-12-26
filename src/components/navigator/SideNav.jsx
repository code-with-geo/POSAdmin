// SideDrawer.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  AccountCircle,
  Article,
  Assessment,
  Category,
  Close,
  Dashboard,
  Discount,
  Home,
  Inventory,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LocalShipping,
  Menu,
  Money,
  Receipt,
  Warehouse,
} from "@mui/icons-material";

const Container = styled.div`
  display: flex;
`;

const Drawer = styled.div`
  position: fixed;
  left: ${(props) => (props.isOpen ? "0" : "-270px")};
  top: 0;
  width: 250px;
  height: 100%;
  background-color: #1e201e;
  color: white;
  padding: 20px;
  box-shadow: ${(props) =>
    props.isOpen ? "2px 0px 5px rgba(0, 0, 0, 0.5)" : "none"};
  transition: left 0.3s ease-in-out;
  z-index: 1000;

  // Conditionally enable scrolling
  overflow-y: ${(props) => (props.isOpen ? "auto" : "hidden")};
  overflow-x: hidden;

  // Optional scrollbar style
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #697565;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #34495e;
  }
`;

const Overlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Content = styled.div`
  width: 100%;
  transition: margin-left 0.3s ease-in-out;
  ${(props) => (props.isOpen ? "margin-left: 250px;" : "margin-left: 0;")}
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 15px;
  left: ${(props) => (props.isOpen ? "270px" : "0px")};
  background-color: #3c3d37;
  color: white;
  border: none;
  padding: 10px 10px;
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  z-index: 1001;
  border-radius: 50%;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #697565;
  }
`;

const DrawerItem = styled(NavLink)`
  display: flex;
  margin: 5px 0;
  padding: 10px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 300;
  color: white;
  border-radius: 4px;
  align-items: center;
  gap: 5px;
  background-color: ${(props) => (props.isActive ? "#34495e" : "transparent")};
  &:hover {
    background-color: #697565;
  }

  &.active {
    background-color: #697565;
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Overlay isOpen={isOpen} onClick={toggleDrawer} />
      <Container>
        <Drawer isOpen={isOpen}>
          <h3>Dashboard</h3>
          <DrawerContent>
            <DrawerItem
              to="/dashboard/"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
              end
            >
              <Dashboard fontSize="small" /> Home
            </DrawerItem>
            <DrawerItem
              to="/dashboard/users"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <AccountCircle fontSize="small" /> Users
            </DrawerItem>
            {/* <DrawerItem
              to="/contact"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Receipt fontSize="small" /> Sales
            </DrawerItem>
            <DrawerItem
              to="/contact"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Assessment fontSize="small" /> Reports
            </DrawerItem> */}
            <DrawerItem
              to="/dashboard/products"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Article fontSize="small" /> Products
            </DrawerItem>
            <DrawerItem
              to="/dashboard/category"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Category fontSize="small" /> Categories
            </DrawerItem>
            <DrawerItem
              to="/dashboard/inventory"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Inventory fontSize="small" /> Inventory
            </DrawerItem>
            <DrawerItem
              to="/dashboard/locations"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Warehouse fontSize="small" /> Locations
            </DrawerItem>
            <DrawerItem
              to="/dashboard/suppliers"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <LocalShipping fontSize="small" /> Supplier
            </DrawerItem>
            <DrawerItem
              to="/dashboard/discounts"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Discount fontSize="small" /> Discount
            </DrawerItem>
            <DrawerItem
              to="/dashboard/cash-drawer"
              onClick={toggleDrawer}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <Money fontSize="small" /> Cash Drawer
            </DrawerItem>
          </DrawerContent>
        </Drawer>
        <Content isOpen={isOpen}>
          <ToggleButton isOpen={isOpen} onClick={toggleDrawer}>
            {isOpen ? <Close /> : <Menu />}
          </ToggleButton>
        </Content>
      </Container>
    </>
  );
};

export default SideNav;
