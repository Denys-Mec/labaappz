import '../style/general.css';
import "../style/signin.css"
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    function handleSubmit() {
        navigate('/questionnaires');
    }

    function getCookieToken() {
        fetch("http://127.0.0.1:8000/api/accounts/csrf_cookie")
            .then(res => res.json())
            .then(data => {
                console.log(data.csrf_token)
                fetch('http://127.0.0.1:8000/api/accounts/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': data.csrf_token
                    },
                    body: JSON.stringify({
                        "username": "denys", "password": "labaappz"
                    })
                }).then(res => {
                    console.log(res)
                });
            })
            .catch(error => console.error("Error fetching CSRF token:", error));
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
            <button onClick={getCookieToken}>Test</button>
        </div>
    );
};

export default SignIn;