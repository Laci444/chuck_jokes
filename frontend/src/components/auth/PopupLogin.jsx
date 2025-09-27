import {useState} from "react";

const PopupLogin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openLoginPopup = () => setIsOpen(true);
    const closeLoginPopup = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openLoginPopup} className="items-center justify-center rounded-xl bg-orange-400 px-3 py-2 cursor-pointer">Login</button>
            {isOpen && (
                <div className="fixed items-center h-screen w-full bg-teal-lighter">
                    <div className="w-full bg-white rounded-xl shadow-2xl p-8 m-4 md:max-w-sm md:mx-auto">
                        <h1 className="block w-full text-center text-grey-darkest mb-6">Log In</h1>
                        <form className="mb-4 md:flex md:flex-wrap md:justify-between" action="/public" method="post">
                            <div className="flex flex-col mb-4 md:w-full">
                                <label className="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest"
                                       htmlFor="first_name">Username</label>
                                <input className="bg-slate-300 py-2 px-3 text-slate-900 rounded-xl" type="text"
                                       name="user_name" id="user_name" required/>
                            </div>

                            <div className="flex flex-col mb-6 md:w-full">
                                <label className="mb-2 uppercase font-bold text-lg text-grey-darkest"
                                       htmlFor="password">Password</label>
                                <input className="bg-slate-300 py-2 px-3 text-slate-900 rounded-xl" type="password"
                                       name="password"
                                       id="password" required/>
                            </div>
                            <button
                                className="block hover:bg-blue-300 text-black uppercase text-lg mx-auto p-4 rounded-4xl cursor-pointer"
                                type="submit">Log In
                            </button>
                            <button
                                onClick={closeLoginPopup}
                                className="block hover:bg-blue-300 text-black uppercase text-lg mx-auto p-4 rounded-4xl cursor-pointer"
                                type="submit">Close
                            </button>

                        </form>

                    </div>
                </div>
            )}
        </div>
    )
}

export default PopupLogin;