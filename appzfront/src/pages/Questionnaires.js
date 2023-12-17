import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/general.css";
import "../style/questionnaires.css";
import axios from 'axios';
import initializeTippy from "../components/Tooltipe";
import {useEffect} from "react";
import StartGuide from "../components/StartGuide";
import Joyride from "react-joyride";
import {useNavigate} from "react-router-dom";
import joyrideConfig from "../components/GuideConfig";

const Questionnaires = () => {
    let tooltipes;
    let classes = [];

    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("enter") === "1")
           StartGuide(navigate);
    }, [navigate]);

    function getTooltipes() {
        if (sessionStorage.getItem("token") != null) {
            axios.get('http://127.0.0.1:8000/api/tooltipe/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + sessionStorage.getItem("token")
                },
            }).then( res => {
                tooltipes = res.data.results
                setTooltipes()
            })
        } else {
            console.log("Error token")
        }
    }

    function setTooltipes() {
        for (let i = 0; i < tooltipes.length; i++) {
            let temp = initializeTippy(tooltipes[i].element_name, tooltipes[i].tooltipe)
            if (temp)
                classes.push(tooltipes[i].element_name)
        }
    }

    getTooltipes()

    const handleJoyrideCallback = (data) => joyrideConfig.handleJoyrideCallback(data, navigate);

    return (
        <>
            <Joyride
                steps={joyrideConfig.steps}
                continuous={true}
                showProgress={true}
                callback={handleJoyrideCallback}
                run={sessionStorage.getItem("enter") === "2"}/>
        <div className={"page"}>
            <Navbar/>
            <div className={"content"}>
                <Header content={"Опитувальники"} classes={classes} />
                <ul className={"questionnaires-list"}>
                    <li className={"step1"}>Оцінка Якості Життя</li>
                    <li>Індекс <span className={"tip physical-health"}>Фізичного Здоров'я</span></li>
                    <li>Скала <span className={"tip emotional-well-being"}>Емоційного Благополуччя</span></li>
                    <li>Оцінка <span className={"tip social-relationships"}>Соціальних Відносин</span></li>
                    <li>Рейтинг Енергії та Втоми</li>
                    <li className={"step2"}>Оцінка Якості Сну</li>
                    <li>Активність та Спорт</li>
                    <li>Дієтичний Журнал</li>
                    <li>Задоволення Загальним Життям</li>
                    <li><span className={"tip monitoring"}>Моніторинг</span> Денної <span className={"tip"}>Рутини</span></li>
                </ul>
            </div>
        </div>
            </>
    );
};

export default Questionnaires;