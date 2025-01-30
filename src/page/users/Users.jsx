import React from "react";
import styled from "styled-components";
import DataTable from "../../components/users/DataTable";
import { PageLink } from "../../components/styles/Component.styled";
import { ArrowLeft, Article } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  padding: 5px;
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

function Users() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <ArrowLeft
                fontSize="small"
                onClick={() => {
                  navigate(`/dashboard/locations`);
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Users
            </h3>
            <PageLink
              color="#FFF"
              bgColor="#1e201e"
              padding="8px"
              fontSize="12px"
              textAlign="center"
              borderRadius="5px"
              hoverbgColor="#697565"
              to={`/dashboard/locations/users/add/${id}`}
            >
              Create User
            </PageLink>
          </Header>
          <Body>
            <DataTable />
          </Body>
        </Wrapper>
      </Container>
    </>
  );
}

export default Users;
