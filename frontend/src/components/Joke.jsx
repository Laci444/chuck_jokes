import React from 'react'

function Joke() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-transparent text-white p-20 rounded shadow-2xl break-all">
                    <p className="text-black ">"When Chuck Norris asks to 'borrow' something from you, be aware that you will never, ever get it back and are in fact about to be kicked in the face.</p>
                    <button className="block hover:bg-blue-300 text-black  text-lg mx-auto p-4 rounded-4xl cursor-pointer">Generate a joke</button>

                </div>
            </div>

        </>
    )
}

export default Joke
