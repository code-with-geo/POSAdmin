// TopNavigator.jsx
import React from "react";
import styled from "styled-components";
import { Notifications, Logout } from "@mui/icons-material";

// Styled components
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #2c3e50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Notification = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    color: #1abc9c;
  }
`;

const NotificationCount = styled.div`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 4px 6px;
  min-width: 20px;
  text-align: center;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #c0392b;
  }
`;

const TopNav = ({ notifications = 0, onLogout }) => {
  return (
    <Container>
      <Logo>My Website</Logo>
      <Actions>
        {/* Notification Icon */}
        <Notification>
          <Notifications fontSize="medium" />
          {notifications > 0 && (
            <NotificationCount>{notifications}</NotificationCount>
          )}
        </Notification>

        {/* Logout Button */}
        <LogoutButton onClick={onLogout}>
          <Logout fontSize="medium" /> Logout
        </LogoutButton>
      </Actions>
    </Container>
  );
};

export default TopNav;
