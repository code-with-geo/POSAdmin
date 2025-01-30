import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Delete, Edit, Inventory, Person } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { ToggleMessage } from "../../libraries/SweetAlert";
import { apiURL } from "../../hooks/Users";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const DeleteButton = styled(Delete)`
  cursor: pointer;
  color: #d44a4a;
`;

const EditButton = styled(Edit)`
  cursor: pointer;
  color: #868e96;
`;

const UserButton = styled(Person)`
  cursor: pointer;
  color: #868e96;
`;

const InventoryButton = styled(Inventory)`
  cursor: pointer;
  color: #868e96;
`;

function ActionButton({ params }) {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [connection, setConnection] = useState(null);
  const navigate = useNavigate();
  const api = apiURL();

  useEffect(() => {
    // Initialize SignalR connection
    const hubConnection = new HubConnectionBuilder()
      .withUrl(`${api}/hubs/locations`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        hubConnection.on("ReceiveMessage", (message) => {
          //console.log("SignalR message received:", message);
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

  const _delete = (id) => {
    try {
      axios
        .put(
          `${api}/api/locations/remove/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res.status === 204) {
            if (connection) {
              connection.send("NotifyClients", "Location Disabled");
            }
            ToggleMessage("success", "Location successfully disabled.");
          }
        })
        .catch((err) => {
          if (err.response) Error();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Tooltip title="Edit">
          <EditButton
            onClick={() =>
              navigate(`/dashboard/locations/edit/${params.row.LocationId}`)
            }
          />
        </Tooltip>
        <Tooltip title="Users">
          <UserButton
            onClick={() =>
              navigate(`/dashboard/locations/users/${params.row.LocationId}`)
            }
          />{" "}
        </Tooltip>
        <Tooltip title="Inventory">
          <InventoryButton
            onClick={() =>
              navigate(
                `/dashboard/locations/inventory/${params.row.LocationId}`
              )
            }
          />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteButton onClick={() => _delete(params.row.LocationId)} />
        </Tooltip>
      </Container>
    </>
  );
}

export default ActionButton;
