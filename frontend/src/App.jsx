import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DosarTransportPage from "./pages/DosarTransportPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import CreateStatusPage from "./pages/CreateStatusPage";
import LoginPage from "./pages/LoginPage";
import Users from "./pages/Users";
>>>>>>>>> Temporary merge branch 2

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
>>>>>>>>> Temporary merge branch 2
        </Routes>
      </Router>
    </div>
  );
}

export default App;