import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import GenerateReport from "./pages/GenerateReport";
import ReportDetails from "./pages/ReportDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/generate" element={<GenerateReport />} />
        <Route path="/reports/:id" element={<ReportDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;