import { ArrowLeft, Article } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextBox } from "../../components/styles/Component.styled";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { apiURL, useGetUserID } from "../../hooks/Users";
import { ToggleMessage } from "../../libraries/SweetAlert";
import StockAdjustmentsModal from "./StockAdjustmentsModal";

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

function AddAdjustment() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const [connection, setConnection] = useState(null);
  const navigate = useNavigate();
  const api = apiURL();
  const userID = useGetUserID();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [units, setUnits] = useState(1);
  const [reason, setReason] = useState("");
  const [action, setAction] = useState(0);

  const onChangeProduct = (event) => {
    setProductId(event.target.value);
  };

  const onChangeAction = (event) => {
    setAction(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`${api}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [token]);

  const _add = (data, event) => {
    event.preventDefault();
    try {
      axios
        .post(
          `${api}/api/stock-adjustments`,
          {
            productid: productId,
            units,
            reason,
            userId: userID,
            locationid: id,
            action,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.status);
          if (res.status === 200) {
            ToggleMessage("success", "Adjustment successfully added.");
            navigate(`/dashboard/locations/inventory/adjustments/${id}`);
          } else {
            ToggleMessage(
              "error",
              "Unexpected response. Please contact technical support."
            );
          }
        })
        .catch((err) => {
          if (err.response) {
            const { data, status } = err.response;

            // Handle 400 error (bad request from backend)
            if (status === 400) {
              const message = data.Message || "An error occurred.";
              ToggleMessage("error", message);
            } else {
              ToggleMessage(
                "error",
                "Unexpected error occurred. Please try again."
              );
            }
          } else {
            // Generic error for no response (e.g., network issues)
            ToggleMessage(
              "error",
              "Unable to connect to the server. Please check your network."
            );
          }
        });
    } catch (error) {
      console.log(error);
      ToggleMessage("error", "An unexpected error occurred. Please try again.");
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Close the modal
  const closeModal = () => setShowModal(false);

  // Open the modal
  const openModal = () => setShowModal(true);

  // File upload function
  const handleFileUpload = async (file) => {
    if (!file) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${api}/api/stock-adjustments/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        if (connection) {
          connection.send("NotifyClients", "Inventory Updated");
        }
        ToggleMessage("success", "File successfully uploaded.");
        setMessage("File uploaded successfully");
        navigate(`/dashboard/locations/inventory/${id}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
    } finally {
      setLoading(false);
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
                  navigate(`/dashboard/locations/inventory/adjustments/${id}`);
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Create Adjustments
            </h3>
            <Button
              color="#FFF"
              bgColor="#1e201e"
              padding="8px"
              fontSize="12px"
              textAlign="center"
              borderRadius="5px"
              hoverbgColor="#697565"
              marginRight="10px"
              onClick={openModal}
            >
              Bulk Stock Adjustments
            </Button>
          </Header>
          <Body>
            <Form onSubmit={handleSubmit(_add)}>
              <List>
                <ListItem>
                  <ComboBox
                    {...register("Products", {
                      validate: (value) => value !== "",
                    })}
                    value={productId}
                    onChange={onChangeProduct}
                  >
                    <option value="">Select a Product</option>
                    {products != null &&
                      products.map((product) => (
                        <option key={product.Id} value={product.Id}>
                          {product.Name}
                        </option>
                      ))}
                  </ComboBox>
                </ListItem>
                {errors.Products && (
                  <ErrorMessage>Please select product</ErrorMessage>
                )}
                <ListItem>
                  <TextBox
                    marginTop="10px"
                    type="text"
                    height="40px"
                    width="250px"
                    fontSize="13px"
                    placeholder="Units Adjusted"
                    required="true"
                    {...register("Units")}
                    onChange={(e) => {
                      setUnits(e.target.value);
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
                    placeholder="Reason"
                    required="true"
                    {...register("Reason")}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ComboBox
                    {...register("Action", {
                      validate: (value) => value !== "",
                    })}
                    value={action}
                    onChange={onChangeAction}
                  >
                    <option value="">Select a Action</option>
                    <option value="0">Add to Inventory</option>
                    <option value="1">Remove from Inventory</option>
                  </ComboBox>
                </ListItem>
                {errors.Products && (
                  <ErrorMessage>Please select action</ErrorMessage>
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
        {/* Modal Component */}
        <StockAdjustmentsModal
          showModal={showModal}
          closeModal={closeModal}
          handleFileUpload={handleFileUpload}
          message={message}
          loading={loading}
        />
      </Container>
    </>
  );
}

export default AddAdjustment;
