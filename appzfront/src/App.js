import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home"
import ChatBot from "./pages/ChatBot"
import SignIn from "./pages/SignIn";

function App() {
  return (
      <Router>
        <Routes>
            <Route exact path="/" element={<SignIn />}/>
          <Route exact path="/home" element={<Home />} />
          <Route path="/about" element={<ChatBot />} />
        </Routes>
      </Router>
  );
}

export default App;
