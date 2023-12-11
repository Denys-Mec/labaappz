import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/general.css";
import "../style/questionnaires.css";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Questionnaires = () => {
    let navigate = useNavigate();

    function handleClick() {
        navigate('/chatbot');
    }
    
    function test() {
        axios.get('http://127.0.0.1:8000/api/accounts/authenticated')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.error('Error:', error));
    }
    return (
        <div className={"page"}>
            <Navbar/>
            <div className={"content"}>
                <Header content={"Опитувальники"} />
                <ul className={"questionnaires-list"}>
                    <button onClick={test}>Test</button>
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