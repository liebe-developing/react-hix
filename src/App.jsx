import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import {
  Dashboard,
  PricePlan,
  Tool,
  Order,
  SignIn,
  SignUp,
  Chats,
  ResetPassword,
  Profile,
  Settings,
  Report,
  Product,
} from "./pages";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Routes>
      <Route exact element={<RootLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/report" element={<Report />} />
        <Route path="/dashboard/price-plan" element={<PricePlan />} />
        <Route path="/dashboard/Tool" element={<Tool />} />
        <Route path="/dashboard/product" element={<Product />} />
        <Route path="/dashboard/order" element={<Order />} />
        <Route path="/dashboard/chats" element={<Chats />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>
      <Route path="/dashboard/sign-in" element={<SignIn />} />
      <Route path="/dashboard/sign-up" element={<SignUp />} />
      <Route path="/dashboard/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
