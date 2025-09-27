import React from 'react'
import PopupLogin from "./auth/PopupLogin.jsx";
import PopupRegister from "./auth/PopupRegister.jsx";


const Navbar = () => {
    return (
        <div className="flex items-center gap-5 p-2">
            <PopupLogin/>
            <PopupRegister/>

        </div>
    )
}
export default Navbar
