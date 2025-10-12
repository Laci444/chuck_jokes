import {useState} from "react";
//import { login } from "../endpoints/api"
import {useNavigate} from "react-router";
import {useAuth} from "../context/useAuth.jsx";

const Login = () => {
    const[ username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            nav("/dashboard");
        } catch (error) {
            alert("login failed");
            console.log(error);
        }
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 text-black">
            <div className="w-full max-w-sm">
                <form onSubmit={handleLogin} >
                    <label>Username</label>
                    <br/>
                    <input
                        type="text"
                        required
                        className="bg-gray-300"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}/>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input
                        type="password"
                        required
                        className="bg-gray-300"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>
                    <br/>
                    <button type="submit">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login;