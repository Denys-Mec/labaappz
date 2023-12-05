import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Questionnaires from "./pages/Questionnaires"
import ChatBot from "./pages/ChatBot"
import SignIn from "./pages/SignIn";
import Questions from "./pages/Questions";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<SignIn />}/>
                <Route path="/questionnaires" element={<Questionnaires />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/chatbot" element={<ChatBot />} />
            </Routes>
        </Router>
    );
}

export default App;
