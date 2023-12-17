import '../style/general.css';
import "../style/signin.css"
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import {useState, useContext} from "react";
import axios from 'axios';
import { UsernameContext } from '../App';
const SignIn = () => {
    // const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const { username, setUsername } = useContext(UsernameContext);

    function handleSubmit(event) {
        event.preventDefault();

            axios.post('http://127.0.0.1:8000/api/get-token', { username: username, password: password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (response.data.token)
                {
                    axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + response.data.token
                        },
                    }).then( res => {
                        console.log(res.data[0])
                        sessionStorage.setItem("name", res.data[0].full_name);
                        sessionStorage.setItem("image", res.data[0].image);
                        sessionStorage.setItem("token", response.data.token);
                        sessionStorage.setItem("enter", "1");
                        navigate("/questionnaires")
                    })
                    
                    if(username === 'admin'){
                        axios.post('http://127.0.0.1:8000/api/chat/',  { username: 'yustin'}, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Token ' + response.data.token
                            },
                        }).then( res => {
                            console.log(res.data)
                        })
                    }
                }
                else
                    alert("Bad user")
            })
            .catch(error => console.error('Error:', error));
    }
    return (
        <div className={"content"}>
            <Header content={"Вхід"} classes={[]}/>
            <form className={"sign-in-form"}>
                <label className={"sign-in-form-label"}>Логін</label>
                <input className={"sign-in-form-input"} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className={"sign-in-form-label"}>Пароль</label>
                <input className={"sign-in-form-input"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className={"gen-btn sign-in-form-btn"} onClick={handleSubmit}>Увійти</button>
            </form>

        </div>
    );
};

export default SignIn;
