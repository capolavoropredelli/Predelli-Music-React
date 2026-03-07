import { api_request } from "../scripts/api";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();
    async function logoutClick() {
        const logout = await api_request("logout", "POST", navigate);
        navigate("/login");
    }

    return (
        <>
            <h1>Settings</h1>
            <button onClick={logoutClick}>log out</button>
        </>
    )
}

export default Settings;