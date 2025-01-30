import React, { useState } from "react";
import styled from "styled-components";
import DataTable from "../../components/inventory/stock-adjustments/DataTable";
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

function StockAdjustments() {
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
                  navigate(`/dashboard/locations/inventory/${id}`);
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Stock Adjustments
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
                to={`/dashboard/locations/inventory/adjustments/add/${id}`}
              >
                Create Adjustment
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

export default StockAdjustments;
