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

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dosar-transport" element={<DosarTransportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/createstatus" element={<CreateStatusPage/>}/>
          <Route path="/status" element={<StatusPage />} />
          <Route path="/updatestatus/:id" element={<UpdateStatusPage />} />
          <Route path="/updatedosar/:id" element={<UpdateDosarPage />} />
          <Route path="/detaliidosar/:id" element={<DetailsDosarPage />} />
          <Route path="/createdosar" element={<CreateDosarPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;