import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/general.css";
import "../style/questionnaires.css";
import {useNavigate} from "react-router-dom";

const Questionnaires = () => {
    let navigate = useNavigate();

    function handleClick() {
        navigate('/chatbot');
    }

    return (
        <div className={"page"}>
            <Navbar/>
            <div className={"content"}>
                <Header content={"Опитувальники"} />
                <ul className={"questionnaires-list"}>
                    <li onClick={handleClick}>Оцінка Якості Життя</li>
                    <li>Індекс Фізичного Здоров'я</li>
                    <li>Скала Емоційного Благополуччя</li>
                    <li>Оцінка Соціальних Відносин</li>
                    <li>Рейтинг Енергії та Втоми</li>
                    <li>Оцінка Якості Сну</li>
                    <li>Активність та Спорт</li>
                    <li>Дієтичний Журнал</li>
                    <li>Задоволення Загальним Життям</li>
                    <li>Моніторинг Денної Рутини</li>
                </ul>
            </div>
        </div>
    );
};

export default Questionnaires;