import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home"
import ChatBot from "./pages/ChatBot"
import SignIn from "./pages/SignIn";
import Questions from "./pages/Questions";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<SignIn />}/>
                <Route path="/home" element={<Home />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/chatbot" element={<ChatBot />} />
            </Routes>
        </Router>
    );
}

export default App;
