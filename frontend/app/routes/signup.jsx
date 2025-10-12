import {useState} from "react";
import {useNavigate} from "react-router";
import {useAuth} from "../context/useAuth.jsx";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await axios.post('/auth/register', { username, email, password });
            login(res.data.user, res.data.token);
            setMessage('Account created successfully! Redirecting...');
            navigate('/dashboard');

        } catch (e) {
            if (e.response?.data?.message) {
                setError(e.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
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