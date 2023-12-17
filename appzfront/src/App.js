import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Questionnaires from './pages/Questionnaires';
import ChatBot from './pages/ChatBotPage';
import SignIn from './pages/SignIn';
import Questions from './pages/Questions';
import ChatBotAdmin from './pages/ChatBotAdmin'
// Create a context for the username
export const UsernameContext = createContext();

function App() {
  // State to hold the username
  const [username, setUsername] = useState('');

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/questionnaires" element={<Questionnaires />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/chatbotadmin" element={<ChatBotAdmin />} />
        </Routes>
      </Router>
    </UsernameContext.Provider>
  );
}

export default App;