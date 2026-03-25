import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage"; 
import Login from "./pages/Login";
import Register from "./pages/Register";


import StudentLayout from "./pages/student/StudentLayout";
import MenuPage from "./pages/student/MenuPage";
import CartPage from "./pages/student/CartPage";
import OrdersPage from "./pages/student/OrdersPage";


import AdminLayout from "./pages/admin/AdminLayout";
import ManageMenuPage from "./pages/admin/ManageMenuPage";
import AdminOrdersPage from "./pages/admin/OrderPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();



  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              
              <Route path="/" element={<LandingPage />} />

              
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              
              <Route
                path="/student"
                element={
                  <ProtectedRoute role="student">
                    <StudentLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="menu" element={<MenuPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route index element={<Navigate to="menu" />} />
              </Route>

              
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="menu" element={<ManageMenuPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route index element={<Navigate to="menu" />} />
              </Route>

             
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;