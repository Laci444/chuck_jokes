import {useState} from "react";
import {useAuth} from "../context/useAuth.jsx";
import {useNavigate} from "react-router";

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const { registerUser } = useAuth();
    const nav = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        const success = await registerUser(username, email, password);
        if (success) {
            nav('/login');
        }
    };
    

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 text-black">
            <div className="w-full max-w-sm">
                <form onSubmit={handleSignup}>
                    <label>Username</label>
                    <br/>
                    <input
                        type="text"
                        required
                        className="bg-gray-300"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}/>
                    <br/>
                    <label>Email</label>
                    <br/>
                    <input
                        type="email"
                        required
                        className="bg-gray-300"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}/>
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

export default Signup;