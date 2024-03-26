import {
  Route,
  Routes,
  // useNavigate
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
} from "./pages";
/* import { useSelector } from "react-redux";
import { useEffect } from "react"; */

function App() {
  /* const userToken = useSelector((state) => state?.user?.currentUser?.token);
  const navigate = useNavigate(); */

  /* useEffect(() => {
    if (!userToken) {
      navigate("/sign-in");
    }
  }, []); */
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/price-plan" element={<PricePlan />} />
        <Route path="/Tool" element={<Tool />} />
        <Route path="/order" element={<Order />} />
        <Route path="/chats" element={<Chats />} />
      </Route>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
