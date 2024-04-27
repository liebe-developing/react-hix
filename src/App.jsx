import { Route, Routes } from "react-router-dom";
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
  TermOfServices,
} from "./pages";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
import NotFound from "./pages/NotFound";

function App() {
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate("/dashboard");
  //   }
  // }, []);
  return (
    <>
      <Routes>
        <Route exact element={<RootLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/price-plan" element={<PricePlan />} />
          <Route path="/Tool" element={<Tool />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/termsofservices" element={<TermOfServices />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
