import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Button, TextBox } from "../../components/styles/Component.styled";
import { useNavigate } from "react-router-dom";
import { ToggleMessage } from "../../libraries/SweetAlert";
import { apiURL } from "../../hooks/Users";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [_, setCookies] = useCookies(["access_token"]);
  const api = apiURL();
  const _login = (data, event) => {
    event.preventDefault();
    try {
      axios
        .post(
          `${api}/api/auth/login?username=${data.Username}&password=${data.Password}`
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setCookies("access_token", res.data.Token);
            navigate("/dashboard/");
          } else if (res.status === 401) {
            ToggleMessage("error", "Incorrect username or password.");
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
          <Form onSubmit={handleSubmit(_login)}>
            <TextBox
              marginTop="10px"
              type="text"
              height="40px"
              width="250px"
              fontSize="13px"
              placeholder="Username"
              required="true"
              {...register("Username")}
            />
            <TextBox
              marginTop="10px"
              type="text"
              height="40px"
              width="250px"
              fontSize="13px"
              placeholder="Password"
              required="true"
              {...register("Password")}
            />
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
              hoverbgColor="#697565"
            >
              Login
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
}

export default Login;
