import Navbar from "../components/Navbar";
import "../style/general.css";
import Header from "../components/Header";

const ChatBot = () => {
    return (
        <div className={"page"}>
            <Navbar />
            <div className={"content"}>
                <Header content={"Чат-бот"} />
            </div>
        </div>
    );
};

export default ChatBot;