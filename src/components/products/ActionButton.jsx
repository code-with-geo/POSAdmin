import React from "react";
import styled from "styled-components";
import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: #fff;
`;

const DeleteButton = styled(Delete)`
  cursor: pointer;
  color: #d44a4a;
`;

const EditButton = styled(Edit)`
  cursor: pointer;
  color: #868e96;
`;

function ActionButton() {
  const navigate = useNavigate();

  const _delete = (id) => {
    try {
      Axios.post(`http://localhost:8080/announcements/remove`, {
        announcementID: id,
      })
        .then((res) => {
          if (res.data.responsecode === "402") {
            console.log(res.data.message);
          } else if (res.data.responsecode === "200") {
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
          <EditButton onClick={() => navigate(`/dashboard/products/edit`)} />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteButton />
        </Tooltip>
      </Container>
    </>
  );
}

export default ActionButton;
