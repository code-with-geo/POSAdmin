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
import Login from "./page/authentication/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import CashDrawer from "./page/cash-drawer/CashDrawer";
import AddCashDrawer from "./page/cash-drawer/AddCashDrawer";
import EditCashDrawer from "./page/cash-drawer/EditCashDrawer";
import Home from "./page/Home";
import SamplePage from "./page/sample/SamplePage";
import StockAdjustments from "./page/inventory/StockAdjustments";
import AddAdjustment from "./page/inventory/AddAdjustment";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/dashboard/locations/users/:id" element={<Users />} />
            <Route
              path="/dashboard/locations/users/add/:id"
              element={<AddUser />}
            />
            <Route
              path="/dashboard/locations/users/:locationid/edit/:id"
              element={<EditUser />}
            />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/products/add" element={<AddProduct />} />
            <Route
              path="/dashboard/products/edit/:id"
              element={<EditProduct />}
            />
            <Route path="/dashboard/category" element={<Category />} />
            <Route path="/dashboard/category/add" element={<AddCategory />} />
            <Route
              path="/dashboard/category/edit/:id"
              element={<EditCategory />}
            />
            <Route
              path="/dashboard/locations/inventory/:id"
              element={<Inventory />}
            />
            <Route
              path="/dashboard/locations/inventory/add/:id"
              element={<AddInventory />}
            />
            <Route
              path="/dashboard/locations/inventory/adjustments/:id"
              element={<StockAdjustments />}
            />
            <Route
              path="/dashboard/locations/inventory/adjustments/add/:id"
              element={<AddAdjustment />}
            />
            <Route
              path="/dashboard/inventory/edit"
              element={<EditInventory />}
            />
            <Route path="/dashboard/locations" element={<Locations />} />
            <Route path="/dashboard/locations/add" element={<AddLocation />} />
            <Route
              path="/dashboard/locations/edit/:id"
              element={<EditLocation />}
            />
            <Route path="/dashboard/suppliers" element={<Suppliers />} />
            <Route path="/dashboard/suppliers/add" element={<AddSupplier />} />
            <Route
              path="/dashboard/suppliers/edit/:id"
              element={<EditSupplier />}
            />
            <Route path="/dashboard/discounts" element={<Discounts />} />
            <Route path="/dashboard/discounts/add" element={<AddDiscount />} />
            <Route
              path="/dashboard/discounts/edit/:id"
              element={<EditDiscount />}
            />
            <Route path="/dashboard/cash-drawer" element={<CashDrawer />} />
            <Route
              path="/dashboard/cash-drawer/add"
              element={<AddCashDrawer />}
            />
            <Route
              path="/dashboard/cash-drawer/edit/:id"
              element={<EditCashDrawer />}
            />

            <Route path="/dashboard/sample" element={<SamplePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
