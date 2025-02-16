import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Polls from "./pages/Polls";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-poll" element={<CreatePoll/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
