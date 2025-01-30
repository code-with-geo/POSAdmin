import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataTable from "../../components/products/DataTable";
import { Button, PageLink } from "../../components/styles/Component.styled";
import { Article } from "@mui/icons-material";
import axios from "axios";
import ImportExcelModal from "./ImportExcelModal";
import { useCookies } from "react-cookie";
import { apiURL } from "../../hooks/Users";

import { HubConnectionBuilder } from "@microsoft/signalr";

const Container = styled.div`
  padding: 10px;

  h3 {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Body = styled.div`
  overflow-x: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Products() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const api = apiURL();

  const [connection, setConnection] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, [token, api]);

  // Close the modal
  const closeModal = () => setShowModal(false);

  // Open the modal
  const openModal = () => setShowModal(true);

  // File upload function
  const handleFileUpload = async (file) => {
    if (!file) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${api}/api/products/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (connection) {
          connection.send("NotifyClients", "User Disabled");
        }
        setMessage("File uploaded successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <Article fontSize="small" /> Products
            </h3>
            <ButtonContainer>
              <Button
                color="#FFF"
                bgColor="#1e201e"
                padding="8px"
                fontSize="12px"
                textAlign="center"
                borderRadius="5px"
                hoverbgColor="#697565"
                marginRight="10px"
                onClick={openModal}
              >
                Upload Product
              </Button>
              <PageLink
                color="#FFF"
                bgColor="#1e201e"
                padding="8px"
                fontSize="12px"
                textAlign="center"
                borderRadius="5px"
                hoverbgColor="#697565"
                to="/dashboard/products/add"
              >
                Create Product
              </PageLink>
            </ButtonContainer>
          </Header>
          <Body>
            <DataTable />
          </Body>
        </Wrapper>
        {/* Modal Component */}
        <ImportExcelModal
          showModal={showModal}
          closeModal={closeModal}
          handleFileUpload={handleFileUpload}
          message={message}
          loading={loading}
        />
      </Container>
    </>
  );
}

export default Products;
