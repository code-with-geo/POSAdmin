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

function AddProduct() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const token = cookies.access_token;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const api = apiURL();
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [supplierPrice, setSupplierPrice] = useState(0);
  const [reorderLevel, setReorderLevel] = useState(0);
  const [isVat, setIsVat] = useState(1);
  const [status, setStatus] = useState(1);
  const [remarks, setRemarks] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryID, setCategoryID] = useState("");

  const onChangeCategory = (event) => {
    setCategoryID(event.target.value);
  };

  const _add = (data, event) => {
    event.preventDefault();
    try {
      axios
        .post(
          `${api}/api/products`,
          {
            barcode: barcode,
            name: name,
            description: description,
            wholesaleprice: wholesalePrice,
            retailprice: retailPrice,
            supplierprice: supplierPrice,
            reorderlevel: reorderLevel,
            isvat: isVat,
            status,
            remarks,
            categoryid: categoryID,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            ToggleMessage("success", "Product successfully added.");
            navigate("/dashboard/products");
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

  useEffect(() => {
    axios
      .get(`${api}/api/category`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCategory(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [token]);

  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <h3>
              <ArrowLeft
                fontSize="small"
                onClick={() => {
                  navigate("/dashboard/products");
                }}
                sx={{ cursor: "pointer" }}
              />
              <Article fontSize="small" /> Create Product
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
                    placeholder="Barcode"
                    required="true"
                    {...register("Barcode")}
                    onChange={(e) => {
                      setBarcode(e.target.value);
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
                    placeholder="Name"
                    required="true"
                    {...register("Name")}
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
                    placeholder="Description"
                    required="true"
                    onChange={(e) => {
                      setDescription(e.target.value);
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
                    placeholder="Supplier Price"
                    required="true"
                    onChange={(e) => {
                      setSupplierPrice(e.target.value);
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
                    placeholder="Retail Price"
                    required="true"
                    onChange={(e) => {
                      setRetailPrice(e.target.value);
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
                    placeholder="Wholesale Price"
                    required="true"
                    onChange={(e) => {
                      setWholesalePrice(e.target.value);
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
                    placeholder="Reorder Level"
                    required="true"
                    onChange={(e) => {
                      setReorderLevel(e.target.value);
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
                    placeholder="Remarks"
                    required="true"
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                  />
                </ListItem>
                <ListItem>
                  <ComboBox
                    {...register("Category", {
                      validate: (value) => value !== "",
                    })}
                    value={categoryID}
                    onChange={onChangeCategory}
                  >
                    <option value="">Select a Category</option>
                    {category != null &&
                      category.map((cate) => (
                        <option key={cate.CategoryId} value={cate.CategoryId}>
                          {cate.Name}
                        </option>
                      ))}
                  </ComboBox>
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

export default AddProduct;
