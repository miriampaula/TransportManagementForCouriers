import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DosarTransportPage from "./pages/DosarTransportPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import CreateStatusPage from "./pages/CreateStatusPage";
import LoginPage from "./pages/LoginPage";
import Users from "./pages/Users";
import StatusPage from "./pages/StatusPage";
import UpdateStatusPage from "./pages/UpdateStatusPage";
import UpdateDosarPage from "./pages/UpdateDosarPage";
import DetailsDosarPage from "./pages/DetailsDosarPage";
import CreateDosarPage from "./pages/CreateDosarPage";
import FacturiDosarPage from "./pages/FacturiDosarPage";
import ScanDosarPage from "./pages/ScanDosarPage";

import { createContext, useEffect, useState } from "react";
// structura pentru userContext
let userContext = JSON.stringify({
  loggedId: false,
  user: "",
  role: "sofer",
  name: "",
  auto: "",
});

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userContext") || userContext)
  );
  useEffect(() => {
    console.log('userState::App', user);
    localStorage.setItem("userContext", JSON.stringify(user));
  }, [user]);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<DosarTransportPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/dosar-transport" element={<DosarTransportPage />} />
            <Route path="/createdosar" element={<CreateDosarPage />} />
            <Route path="/updatedosar/:id" element={<UpdateDosarPage />} />
            <Route path="/detaliidosar/:id" element={<DetailsDosarPage />} />
            <Route path="/facturi/:idDosar" element={<FacturiDosarPage />} />
            <Route path="/scan/dosar/:idDosar" element={<ScanDosarPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/createstatus" element={<CreateStatusPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/updatestatus/:id" element={<UpdateStatusPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
