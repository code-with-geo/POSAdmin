import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Products from "./page/products/Products";
import AddProduct from "./page/products/AddProduct";
import EditProduct from "./page/products/EditProduct";
import Users from "./page/users/Users";
import AddUser from "./page/users/AddUser";
import EditUser from "./page/users/EditUser";
import Category from "./page/category/Category";
import AddCategory from "./page/category/AddCategory";
import EditCategory from "./page/category/EditCategory";
import Inventory from "./page/inventory/Inventory";
import AddInventory from "./page/inventory/AddInventory";
import EditInventory from "./page/inventory/EditInventory";
import Locations from "./page/locations/Locations";
import EditLocation from "./page/locations/EditLocation";
import AddLocation from "./page/locations/AddLocation";
import Suppliers from "./page/suppliers/Suppliers";
import AddSupplier from "./page/suppliers/AddSupplier";
import EditSupplier from "./page/suppliers/EditSupplier";
import Discounts from "./page/discounts/Discounts";
import AddDiscount from "./page/discounts/AddDiscount";
import EditDiscount from "./page/discounts/EditDiscount";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/users" element={<Users />} />
            <Route path="/dashboard/users/add" element={<AddUser />} />
            <Route path="/dashboard/users/edit" element={<EditUser />} />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/products/add" element={<AddProduct />} />
            <Route path="/dashboard/products/edit" element={<EditProduct />} />
            <Route path="/dashboard/category" element={<Category />} />
            <Route path="/dashboard/category/add" element={<AddCategory />} />
            <Route path="/dashboard/category/edit" element={<EditCategory />} />
            <Route path="/dashboard/inventory" element={<Inventory />} />
            <Route path="/dashboard/inventory/add" element={<AddInventory />} />
            <Route
              path="/dashboard/inventory/edit"
              element={<EditInventory />}
            />
            <Route path="/dashboard/locations" element={<Locations />} />
            <Route path="/dashboard/locations/add" element={<AddLocation />} />
            <Route
              path="/dashboard/locations/edit"
              element={<EditLocation />}
            />
            <Route path="/dashboard/suppliers" element={<Suppliers />} />
            <Route path="/dashboard/suppliers/add" element={<AddSupplier />} />
            <Route
              path="/dashboard/suppliers/edit"
              element={<EditSupplier />}
            />
            <Route path="/dashboard/discounts" element={<Discounts />} />
            <Route path="/dashboard/discounts/add" element={<AddDiscount />} />
            <Route
              path="/dashboard/discounts/edit"
              element={<EditDiscount />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
