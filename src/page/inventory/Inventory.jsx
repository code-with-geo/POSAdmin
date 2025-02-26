import React, { useState } from "react";
import styled from "styled-components";
import DataTable from "../../components/inventory/DataTable";
import { Button, PageLink } from "../../components/styles/Component.styled";
import { ArrowLeft, Article } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

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

function Inventory() {
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
              <Article fontSize="small" /> Inventory
            </h3>
            <ButtonContainer>
              <PageLink
                color="#FFF"
                bgColor="#1e201e"
                padding="8px"
                fontSize="12px"
                textAlign="center"
                borderRadius="5px"
                hoverbgColor="#697565"
                marginRight="10px"
                to={`/dashboard/locations/inventory/adjustments/${id}`}
              >
                Stock Adjustments
              </PageLink>
              <PageLink
                color="#FFF"
                bgColor="#1e201e"
                padding="8px"
                fontSize="12px"
                textAlign="center"
                borderRadius="5px"
                hoverbgColor="#697565"
                to={`/dashboard/locations/inventory/add/${id}`}
              >
                Stock In
              </PageLink>
            </ButtonContainer>
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
