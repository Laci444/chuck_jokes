import {useState} from "react";
import {useAuth} from "../context/useAuth.jsx";
import {Navigate, useNavigate} from "react-router";
import axios from "axios";

const Dashboard = () => {

    const [joke, setJoke] = useState("");
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if(!isAuthenticated) return <Navigate to="/login" replace/>

    console.log('[AuthContext]', {user, isAuthenticated});

    const fetchJokes = async () => {
        fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(joke => setJoke(joke.value))
    }

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout', )
        } catch (error) {
            console.error(error)
        }

        logout()
        navigate('/login');
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-transparent text-white p-20 rounded shadow-2xl break-all">
                <p className="text-black ">{joke}</p>
                <button onClick={fetchJokes} className="block hover:bg-blue-300 text-black  text-lg mx-auto p-4 rounded-4xl cursor-pointer">Generate a joke</button>
                <button className="text-black">Like</button>
            </div>
            <button onClick={handleLogout} className="bg-red-200 text-black" >Logout</button>

        </div>
    )
}

export default Dashboard;