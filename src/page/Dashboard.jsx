// Dashboard.jsx
import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom"; // To render child routes dynamically
import SideNav from "../components/navigator/SideNav";
import { useCookies } from "react-cookie";

// Styled components
const DashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-x: auto;
`;

const MainContent = styled.div`
  display: flex;
`;

const SideNavigation = styled.div`
  flex-shrink: 0;
`;

const PageContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  margin-left: 50px; /* Width of the SideDrawer */
`;

const Dashboard = () => {
  return (
    <DashboardLayout>
      <MainContent>
        <SideNavigation>
          <SideNav />
        </SideNavigation>
        <PageContent>
          <Outlet />
        </PageContent>
      </MainContent>
    </DashboardLayout>
  );
};

export default Dashboard;
