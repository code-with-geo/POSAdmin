import React from "react";
import styled from "styled-components";
import DataTable from "../../components/inventory/DataTable";
import { PageLink } from "../../components/styles/Component.styled";
import { Article } from "@mui/icons-material";

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

function Inventory() {
  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <Article fontSize="small" /> Inventory
            </h3>
            <PageLink
              color="#FFF"
              bgColor="#1e201e"
              padding="8px"
              fontSize="12px"
              textAlign="center"
              borderRadius="5px"
              hoverbgColor="#697565"
              to="/dashboard/inventory/add"
            >
              Create Inventory
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

export default Inventory;
