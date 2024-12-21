import React from "react";
import styled from "styled-components";
import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

function ActionButton({ params }) {
  const navigate = useNavigate();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjNiZTVjZWJjLThkNDktNGY4Yy1iODkzLTYxNjRmNTNkMjY3YyIsImV4cCI6MTczNDc4NzMzOSwiaXNzIjoiSnd0QXV0aEFwaSIsImF1ZCI6Ikp3dEF1dGhBcGlVc2VycyJ9.eGF46l67kS30y-_g8p_gLy36G-HTLf0B8eMhdr9EMo0";

  const _delete = (id) => {
    try {
      axios
        .put(`https://localhost:7148/api/products/remove/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
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
              navigate(`/dashboard/products/edit/${params.row.Id}`)
            }
          />
        </Tooltip>
        <Tooltip title="Delete">
          <DeleteButton onClick={() => _delete(params.row.Id)} />
        </Tooltip>
      </Container>
    </>
  );
}

export default ActionButton;
