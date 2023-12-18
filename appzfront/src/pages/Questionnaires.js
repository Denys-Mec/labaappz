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
            axios.get('http://127.0.0.1:8000/api/tooltipe/?page_size=20', {
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
                steps={joyrideConfig.steps1}
                continuous={true}
                callback={handleJoyrideCallback}
                run={sessionStorage.getItem("enter") === "2"}/>
        <div className={"page"}>
            <Navbar/>
            <div className={"content"}>
                <Header content={"Опитувальники"} classes={classes} />
                <ul className={"questionnaires-list"}>
                    <li><span className={"tip stroke-scale"}>Шкала інсульту</span> Національного Інституту Здоров’я (NIHSS)</li>
                    <li>Модифікована <span className={"tip rankin-scale"}>шкала Ренкіна</span> (mRS)</li>
                    <li>Канадська <span className={"tip neurological-scale"}>неврологічна шкала</span> (CNS)</li>
                    <li>Шкала для оцінки <span className={"tip intracranial-hemorrhages"}>внутрішньомозкових крововиливів</span> (ICH)</li>
                    <li>Шкала оцінки ризику інсульту при <span className={"tip atrial-fibrillation"}>фібриляції передсердь</span> (CHADS2)</li>
                    <li>Шкала оцінки ризику <span className={"tip thromboembolic-complications"}>тромбоемболічних ускладнень</span> у хворих
                        з <span className={"tip atrial-fibrillation"}>фібриляцією/мерехтінням передсердь</span> (CHA2DS2-VASc)</li>
                    <li>Шкала оцінки ризику кровотеч (HASBLED)</li>
                    <li>Шкала <span className={"tip glasgow-coma-scale"}>ком Глазго</span> (GCS)</li>
                    <li>Шкала об’єктивної оцінки <span className={"tip consciousness-deficit"}>дефіциту свідомості</span> (FOUR)</li>
                    <li>Інтегральна оцінка <span className={"tip cognitive-functions"}>когнітивних функцій</span> за допомогою шкали
                        Гудгласа і Каплана</li>
                    <li>Монреальська шкала оцінки <span className={"tip cognitive-functions"}>когнітивних функцій</span> (MOCA)</li>
                    <li><span className={"tip barthel-index"}>Індекс Бартеля</span> (BI)</li>
                    <li>Короткий тест для оцінки <span className={"tip cognitive-functions"}>когнітивних функцій</span> (MMSE)</li>
                    <li>Визначення функціональної незалежності (FIM)</li>
                    <li>Шкала оцінки когнітивних розладів — враження <span className={"tip clinician"}>клініциста </span>
                        про ступінь важкості на основі інтерв’ю (CIBIS)</li>
                    <li>Шкала оцінки когнітивних розладів — враження <span className={"tip clinician"}>клініциста </span>
                        про зміни та вклад опікунів на основі інтерв’ю (CIBIC+)</li>
                    <li>Шкала оцінки тяжкості <span className={"tip alzheimer-disease"}>хвороби Альцгеймера</span> —
                        оцінка когнітивних розладів (ADAS-Cog)</li>
                    <li>Геріатрична шкала <span className={"tip depression"}>депресії</span> (GDS)</li>
                    <li>Госпітальна шкала тривоги та <span className={"tip depression"}>депресії</span> (HADS)</li>
                    <li>Тест викреслювання ліній</li>
                    <li>Огляд опитувальників SF-12 та SF-36</li>
                    <li>Короткий опитувальник якості життя (SF-36)</li>
                    <li>Короткий опитувальник якості життя (SF-12)</li>
                    <li>Оціночний тест Фугл-Мейєра (FMA)</li>
                    <li>Тест оцінки діяльності рук (ARAT) </li>
                    <li>Тест із дев’ятьма лунками та кілочками
                        (тест для <span className={"tip multiple-sclerosis-diagnosis"}>діагностики РС</span>) (NHPT)</li>
                    <li>Швидкість ходьби (GV)</li>
                    <li>Тест Берга на рівновагу (BBS)</li>
                </ul>
            </div>
        </div>
            </>
    );
};

export default Questionnaires;