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

function EditDiscount() {
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

  const [discount, setDiscount] = useState([]);
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState();

  const _edit = (data, event) => {
    event.preventDefault();
    try {
      axios
        .put(
          `${api}/api/discounts/${id}`,
          {
            name,
            percentage,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            ToggleMessage("success", "Discount successfully updated.");
            navigate("/dashboard/discounts");
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

  const fetchDiscounts = () => {
    axios
      .get(`${api}/api/discounts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setDiscount(response.data))
      .catch((error) => console.error("Error fetching discount:", error));
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  useEffect(() => {
    if (discount != null) {
      setName(discount.Name);
      setPercentage(discount.Percentage);
    }
  }, [discount]);

  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <ArrowLeft
                fontSize="small"
                onClick={() => {
                  navigate("/dashboard/discounts");
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Edit Discount
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
                    placeholder="Name"
                    required="true"
                    {...register("Name")}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
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
                    placeholder="Percentage"
                    required="true"
                    {...register("Percentage")}
                    value={percentage}
                    onChange={(e) => {
                      setPercentage(e.target.value);
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

export default EditDiscount;
