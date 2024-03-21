import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Dashboard, PricePlan, Tool, Order, SignIn, SignUp } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/price-plan" element={<PricePlan />} />
        <Route path="/Tool" element={<Tool />} />
        <Route path="/order" element={<Order />} />
      </Route>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
