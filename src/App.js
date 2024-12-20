import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Products from "./page/products/Products";
import AddProduct from "./page/products/AddProduct";
import EditProduct from "./page/products/EditProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/products/add" element={<AddProduct />} />
            <Route path="/dashboard/products/edit" element={<EditProduct />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
