import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ChatScreen from "./components/ChatScreen";
import Register from "./common/Registration";
import Login from "./common/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat/:roomId" element={<ChatScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
