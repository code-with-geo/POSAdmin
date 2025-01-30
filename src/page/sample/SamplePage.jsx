import React, { useState } from "react";
import axios from "axios";
import UploadModal from "./UploadModal"; // Import the Styled Modal Component

const SamplePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
        "http://localhost:7148/api/products/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
        }
      );

      if (response.status === 200) {
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
    <div>
      <h1>Product Upload</h1>
      <button onClick={openModal}>Upload File</button>

      {/* Modal Component */}
      <UploadModal
        showModal={showModal}
        closeModal={closeModal}
        handleFileUpload={handleFileUpload}
        message={message}
        loading={loading}
      />
    </div>
  );
};

export default SamplePage;
