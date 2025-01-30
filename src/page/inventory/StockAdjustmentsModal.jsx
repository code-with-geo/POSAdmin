import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/styles/Component.styled";
import { apiURL } from "../../hooks/Users";
import { useCookies } from "react-cookie";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: ${({ success }) => (success ? "green" : "red")};
`;

const StockAdjustmentsModal = ({
  showModal,
  closeModal,
  handleFileUpload,
  message,
  loading,
}) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const api = apiURL();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    handleFileUpload(file);
  };

  return (
    showModal && (
      <ModalOverlay>
        <ModalContainer>
          <h2>Import Stock Adjustments</h2>
          <input type="file" onChange={handleFileChange} />
          <Button
            color="#FFF"
            bgColor="#1e201e"
            padding="10px"
            fontSize="12px"
            width="100px"
            textAlign="center"
            borderRadius="5px"
            hoverbgColor="#697565"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
          {message && (
            <Message success={message.includes("successfully")}>
              {message}
            </Message>
          )}
          <Button
            color="#FFF"
            bgColor="#1e201e"
            padding="10px"
            width="100px"
            fontSize="12px"
            textAlign="center"
            borderRadius="5px"
            hoverbgColor="#697565"
            marginRight="10px"
            onClick={closeModal}
          >
            Close
          </Button>
        </ModalContainer>
      </ModalOverlay>
    )
  );
};

export default StockAdjustmentsModal;
