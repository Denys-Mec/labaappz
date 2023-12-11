import '../style/general.css';
import "../style/signin.css"
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from 'axios';

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    
    function handleSubmit(event) {
        event.preventDefault();
        axios.get('http://127.0.0.1:8000/api/accounts/csrf_cookie')
            .then(response => {
                axios.post('http://127.0.0.1:8000/api/accounts/login', { username: login, password: password }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.cookie.substring(10)
                    },
                })
                    .then(response => {
                        console.log(response.data)
                        if (response.data.success)
                            navigate('/questionnaires');
                        else
                            alert("Bad user")
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <div className={"content"}>
            <Header content={"Вхід"}/>
            <form className={"sign-in-form"}>
                <label className={"sign-in-form-label"}>Логін</label>
                <input className={"sign-in-form-input"} value={login} onChange={(e) => setLogin(e.target.value)}/>
                <label className={"sign-in-form-label"}>Пароль</label>
                <input className={"sign-in-form-input"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className={"gen-btn sign-in-form-btn"} onClick={handleSubmit}>Увійти</button>
            </form>
        </div>
    );
};

export default SignIn;