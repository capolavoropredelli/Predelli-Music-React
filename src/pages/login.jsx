import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_request } from "../scripts/api";
import '../style/login.css';
import { useMusicContext } from "../contexts/musicContext";

function Login() {
    const { setIsLogged } = useMusicContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleForm(e) {
        e.preventDefault();
        const body = {
            username: username,
            password: password
        }
        const result = await api_request("login", "POST", navigate, body);
        if (result.success == true) {
            setIsLogged(true);
            navigate("/");
        }
    }

    return (
        <div id="login-container">
            <form onSubmit={(e) => handleForm(e)} id="login-form">
                <h1>Login</h1>
                <input type="text" placeholder="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login