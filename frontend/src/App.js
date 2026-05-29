import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import IncidentList from "./pages/IncidentList";
import IncidentForm from "./pages/IncidentForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incidents" element={<IncidentList />} />
        <Route path="/incidents/new" element={<IncidentForm />} />
        <Route path="/incidents/edit/:id" element={<IncidentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
