import {useState} from "react";
import {useAuth} from "../context/useAuth.jsx";
import {Navigate, useNavigate} from "react-router";
import axios from "axios";
import JokeViewer from "../components/JokeViewer"
const Dashboard = () => {


    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if(!isAuthenticated) return <Navigate to="/login" replace/>

    console.log('[AuthContext]', {user, isAuthenticated});

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
        <>
        <div>
            <button onClick={handleLogout} className="text-black p-4 bg-red-200 rounded-2xl m-2 cursor-pointer" >Logout</button>
        </div>
        <div className="flex items-center justify-center h-screen">

            <JokeViewer/>


        </div>
        </>
    )
}

export default Dashboard;