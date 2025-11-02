import {useState} from "react";
import {useAuth} from "../context/useAuth.jsx";
import {Link, Navigate, useNavigate} from "react-router";
import axios from "axios";
import JokeViewer from "../components/JokeViewer"
import {Button} from "../components/ui/button.jsx";
import {ThemeToggle} from "../components/themeToggle.jsx";

const Dashboard = () => {


    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    if(!isAuthenticated) return <Navigate to="/" replace/>

    console.log('[AuthContext]', {user, isAuthenticated});

    const handleLogout = async () => {
        try {
            await axios.post('/auth/logout', )
        } catch (error) {
            console.error(error)
        }

        logout()
        navigate('/');
    }


    return (
        <>
            <header className="flex items-center justify-between w-full px-8 py-4">
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
                <Link to="/" className="flex-1 text-center">
                    <h1 className="text-2xl font-bold">CJ</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
            </header>

        <div className="flex items-center justify-center h-screen">

            <JokeViewer/>


        </div>
        </>
    )
}

export default Dashboard;