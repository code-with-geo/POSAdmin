import { ArrowLeft, Article } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextBox } from "../../components/styles/Component.styled";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { apiURL } from "../../hooks/Users";
import { ToggleMessage } from "../../libraries/SweetAlert";

const Container = styled.div`
  padding: 10px;

  h3 {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
const Wrapper = styled.div``;
const Header = styled.div``;
const Body = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;
const Form = styled.form``;
const List = styled.ul`
  list-style: none;
  gap: 10px;
`;
const ListItem = styled.li``;

function EditCashDrawer() {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;

  const api = apiURL();
  const [connection, setConnection] = useState(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cashDrawer, setCashDrawer] = useState([]);
  const [cashier, setCashier] = useState("");
  const [initialCash, setInitialCash] = useState();
  const [totalSales, setTotalSales] = useState();
  const [withdrawals, setWithdrawals] = useState();
  const [expense, setExpense] = useState();
  const [drawerCash, setDrawerCash] = useState();

  const _edit = (data, event) => {
    event.preventDefault();
    try {
      axios
        .put(
          `${api}/api/cashdrawer/${id}`,
          {
            cashier,
            initialcash: initialCash,
            totalsales: totalSales,
            withdrawals,
            expense,
            drawercash: drawerCash,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            ToggleMessage("success", "Cash drawer successfully updated.");
            navigate("/dashboard/cash-drawer");
          } else if (res.status === 402) {
          } else {
            ToggleMessage("error", "Please contact technical support.");
          }
        })
        .catch((err) => {
          if (err.response) Error();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCashDrawer = () => {
    axios
      .get(`${api}/api/cashdrawer/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCashDrawer(response.data))
      .catch((error) => console.error("Error fetching cash drawer:", error));
  };

  useEffect(() => {
    fetchCashDrawer();
  }, []);

  useEffect(() => {
    if (cashDrawer != null) {
      setCashier(cashDrawer.Cashier);
      setInitialCash(cashDrawer.InitialCash);
      setTotalSales(cashDrawer.TotalSales);
      setWithdrawals(cashDrawer.Withdrawals);
      setExpense(cashDrawer.Expense);
      setDrawerCash(cashDrawer.DrawerCash);
    }
  }, [cashDrawer]);

  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <ArrowLeft
                fontSize="small"
                onClick={() => {
                  navigate("/dashboard/cash-drawer");
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Edit Cash Drawer
            </h3>
          </Header>
          <Body>
            <Form onSubmit={handleSubmit(_edit)}>
              <List>
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Cashier"
                    required="true"
                    {...register("Cashier")}
                    value={cashier}
                    onChange={(e) => {
                      setCashier(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Initial Cash"
                    required="true"
                    {...register("InitialCash")}
                    value={initialCash}
                    onChange={(e) => {
                      setInitialCash(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Total Sales"
                    required="true"
                    {...register("TotalSales")}
                    value={totalSales}
                    onChange={(e) => {
                      setTotalSales(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Withdrawals"
                    required="true"
                    {...register("Withdrawals")}
                    value={withdrawals}
                    onChange={(e) => {
                      setWithdrawals(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Expense"
                    required="true"
                    {...register("Expense")}
                    value={expense}
                    onChange={(e) => {
                      setExpense(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Drawer Cash"
                    required="true"
                    {...register("DrawerCash")}
                    value={drawerCash}
                    onChange={(e) => {
                      setDrawerCash(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    width="250px"
                    height="40px"
                    padding="10px"
                    fontSize="13px"
                    fontWeight="500"
                    color="#fff"
                    borderRadius="5px"
                    bgColor="#1e201e"
                    marginTop="20px"
                    marginLeft="10px"
                    hoverbgColor="#697565"
                  >
                    Save
                  </Button>
                </ListItem>
              </List>
            </Form>
          </Body>
        </Wrapper>
      </Container>
    </>
  );
}

export default EditCashDrawer;
