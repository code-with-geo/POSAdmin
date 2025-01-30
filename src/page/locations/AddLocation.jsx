import { ArrowLeft, Article } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextBox } from "../../components/styles/Component.styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { ToggleMessage } from "../../libraries/SweetAlert";
import { apiURL } from "../../hooks/Users";

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

const ComboBox = styled.select`
  width: 270px;
  height: 40px;
  line-height: 2;
  padding: 0 0.5rem;
  border: 2px solid transparent;
  border-radius: 5px;
  outline: none;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.7);
  transition: 0.3s ease;
  border-color: #e2e8ec;
  margin-top: 10px;

  &:focus {
    outline: none;
    border-color: #697565;
    background-color: #fff;
  }

  &:hover {
    border-color: #697565;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #c03333;
  margin-left: 5px;
  margin-top: 5px;
`;

function AddLocation() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const api = apiURL();

  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);

  const [locationType, setLocationType] = useState("");
  const onChangeLocationType = (event) => {
    setLocationType(event.target.value);
  };

  const _add = (data, event) => {
    event.preventDefault();
    try {
      axios
        .post(
          `${api}/api/locations`,
          {
            name,
            status,
            locationtype: locationType,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            ToggleMessage("success", "Category successfully added.");
            navigate("/dashboard/locations");
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
  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <ArrowLeft
                fontSize="small"
                onClick={() => {
                  navigate("/dashboard/locations");
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Create Location
            </h3>
          </Header>
          <Body>
            <Form onSubmit={handleSubmit(_add)}>
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
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ComboBox
                    {...register("LocationType", {
                      validate: (value) => value !== "",
                    })}
                    value={locationType}
                    onChange={onChangeLocationType}
                  >
                    <option value="">Select a Location Type</option>
                    <option value={"0"}>Warehouse</option>
                    <option value={"1"}>Store Location</option>
                  </ComboBox>
                </ListItem>
                {errors.LocationType && (
                  <ErrorMessage>Please select location type</ErrorMessage>
                )}
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

export default AddLocation;
