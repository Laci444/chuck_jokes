import Joke from "./components/Joke.jsx";
import Navbar from "./components/Navbar.jsx";


function App() {


    return (
        <>
            <div className="w-screen min-vh-100 bg-amber-200 ">
                <Navbar/>
            </div>
            <div>
                <Joke/>
            </div>
        </>


    )
}

export default App
