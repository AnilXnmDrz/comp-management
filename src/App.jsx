// src/App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CompanyProfile from "./components/Dashboard/CompanyProfile";
import BranchManagement from "./components/Dashboard/BranchManagement";
import RegionManagement from "./components/Dashboard/RegionManagement";
import ProductList from "./components/Dashboard/ProductList";
import BuyerList from "./components/Dashboard/BuyerList";
import SellerList from "./components/Dashboard/SellerList";
import Login from "./components/Auth/Login";
import "./index.css";
import { SnackbarProvider } from "./components/service/SnackbarContext";
import NotificationService from "./components/service/NotificationService";

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <>
      <SnackbarProvider>
        <NotificationService />

        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <Route path="/*" element={<Dashboard />}>
                <Route index element={<Navigate to="company-profile" />} />
                <Route path="company-profile" element={<CompanyProfile />} />
                <Route
                  path="branch-management"
                  element={<BranchManagement />}
                />
                <Route
                  path="region-management"
                  element={<RegionManagement />}
                />
                <Route path="products" element={<ProductList />} />
                <Route path="buyers" element={<BuyerList />} />
                <Route path="sellers" element={<SellerList />} />
              </Route>
            ) : (
              <Route path="/*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </Router>
      </SnackbarProvider>
    </>
  );
}

export default App;
