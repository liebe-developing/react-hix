import { Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { Dashboard, PricePlan,Tool } from "./pages";


function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/" element={<PricePlan />} />
        <Route path="/Tool" element={<Tool />} />
      </Route>
    </Routes>
  );
}

export default App;
