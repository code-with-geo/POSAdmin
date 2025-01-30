import React, { useState } from "react";
import styled from "styled-components";

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
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 5px;

  &:disabled {
    background-color: #c0c0c0;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: ${({ success }) => (success ? "green" : "red")};
`;

const UploadModal = ({
  showModal,
  closeModal,
  handleFileUpload,
  message,
  loading,
}) => {
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
          <h2>Upload Excel File</h2>
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
          {message && (
            <Message success={message.includes("successfully")}>
              {message}
            </Message>
          )}
          <Button onClick={closeModal}>Close</Button>
        </ModalContainer>
      </ModalOverlay>
    )
  );
};

export default UploadModal;
