import '../style/general.css';
import "../style/signin.css"
import Header from "../components/Header";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    function handleSubmit() {
        navigate('/questionnaires');
    }

    return (
        <div className={"content"}>
            <Header content={"Вхід"}/>
            <form className={"sign-in-form"} onSubmit={handleSubmit}>
                <label className={"sign-in-form-label"}>Логін</label>
                <input className={"sign-in-form-input"} value={login} onChange={(e) => setLogin(e.target.value)}/>
                <label className={"sign-in-form-label"}>Пароль</label>
                <input className={"sign-in-form-input"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className={"gen-btn sign-in-form-btn"} type={"submit"}>Увійти</button>
            </form>
        </div>
    );
};

export default SignIn;