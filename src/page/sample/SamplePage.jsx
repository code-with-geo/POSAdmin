import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { apiURL } from "../../hooks/Users";

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 12px;
  width: 300px;
  height: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background: #1e201e;
  color: #fff;
  padding: 10px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 12px;
`;

const Input = styled.input`
  width: 60px;
  padding: 10px;
  text-align: center;
  height: 20px;
`;

const Button = styled.button`
  background: #1e201e;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  font-size: 12px;

  &:hover {
    background: #697565;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProductItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  width: 150px;
  height: 40px;
`;

const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 12px;
  width: 300px;
  margin-bottom: 10px;
`;

// Component
const SamplePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("Retail");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    note: "",
    agent: "",
    term: "",
    shipTo: "",
  });

  const [cookies] = useCookies();
  const token = cookies.access_token;
  const api = apiURL();

  // Fetch products with Authorization token
  const fetchProducts = () => {
    axios
      .get(`${api}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially set all products to be filtered
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product selection
  const handleSelectProduct = (product) => {
    setSelectedProducts([...selectedProducts, { ...product, units: 1 }]);
    setIsModalOpen(false);
  };

  // Handle unit change and update subtotal
  const handleUnitChange = (id, value) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product.Id === id ? { ...product, units: Number(value) || 1 } : product
      )
    );
  };

  // Handle product name filter
  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredProducts(
      products.filter((product) => product.Name.toLowerCase().startsWith(query))
    );
  };

  // Calculate total order amount (sum of subtotals)
  const calculateTotalOrder = () => {
    return selectedProducts.reduce((total, product) => {
      const price =
        transactionType === "Retail"
          ? product.RetailPrice
          : product.WholesalePrice;
      return total + product.units * price;
    }, 0);
  };

  // Create order and submit to API
  const handleCreateOrder = () => {
    const orderData = {
      formData,
      selectedProducts,
      transactionType,
    };

    axios
      .post(`${api}/api/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Order created successfully", response.data);
        // Reset state or handle order success
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  return (
    <Container>
      {/* Form Inputs */}
      <FormSection>
        <InputField
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <InputField
          type="text"
          placeholder="Note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Agent"
          value={formData.agent}
          onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Term"
          value={formData.term}
          onChange={(e) => setFormData({ ...formData, term: e.target.value })}
        />
        <InputField
          type="text"
          placeholder="Ship To"
          value={formData.shipTo}
          onChange={(e) => setFormData({ ...formData, shipTo: e.target.value })}
        />
      </FormSection>

      {/* Transaction Type and Browse Button */}
      <ActionBar>
        <Select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Retail">Retail</option>
          <option value="Wholesale">Wholesale</option>
        </Select>
        <Button onClick={() => setIsModalOpen(true)}>Browse Products</Button>
      </ActionBar>

      {/* Product Table */}
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Barcode</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Units</Th>
            <Th>Subtotal</Th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.Id}>
              <Td>{product.Id}</Td>
              <Td>{product.Barcode}</Td>
              <Td>{product.Name}</Td>
              <Td>{product.Description}</Td>
              <Td>
                ₱
                {transactionType === "Retail"
                  ? product.RetailPrice
                  : product.WholesalePrice}
              </Td>
              <Td>
                <Input
                  type="number"
                  min="1"
                  value={product.units}
                  onChange={(e) => handleUnitChange(product.Id, e.target.value)}
                />
              </Td>
              <Td>
                ₱
                {(
                  product.units *
                  (transactionType === "Retail"
                    ? product.RetailPrice
                    : product.WholesalePrice)
                ).toFixed(2)}
              </Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <Td colSpan="6" style={{ textAlign: "right", fontWeight: "bold" }}>
              Total Sale:
            </Td>
            <Td style={{ fontWeight: "bold" }}>
              ₱{calculateTotalOrder().toFixed(2)}
            </Td>
          </tr>
        </tfoot>
      </Table>

      {/* Create Order Button */}
      <ActionBar>
        <Button onClick={handleCreateOrder}>Create Order</Button>
      </ActionBar>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Select a Product</h3>
            <FilterInput
              type="text"
              placeholder="Filter by product name"
              onChange={handleFilterChange}
            />
            <ProductList>
              {filteredProducts.map((product) => (
                <ProductItem
                  key={product.Id}
                  onClick={() => handleSelectProduct(product)}
                >
                  {product.Name} - ₱
                  {transactionType === "Retail"
                    ? product.RetailPrice
                    : product.WholesalePrice}
                </ProductItem>
              ))}
            </ProductList>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SamplePage;
