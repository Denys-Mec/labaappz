import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/general.css";

const Questionnaires = () => {
    return (
        <div className={"page"}>
            <Navbar/>
            <div className={"content"}>
                <Header content={"Опитувальники"} />
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Questionnaires;