import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
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
  Report
} from "./pages";
 import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
   const userToken = useSelector((state) => state?.user?.currentUser?.token);
  const navigate = useNavigate();

   useEffect(() => {
    if (!userToken) {
      navigate("/sign-in");
    }
  }, []); 
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<Report />} />
        <Route path="/price-plan" element={<PricePlan />} />
        <Route path="/Tool" element={<Tool />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
