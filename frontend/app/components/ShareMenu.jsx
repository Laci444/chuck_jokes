import { useState, useRef, useEffect } from "react";
import { Share } from "lucide-react";
import { FaTwitter, FaRedditAlien, FaFacebook, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";

export default function ShareMenu({ shareLinks }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    if (!shareLinks) return null;

    return (
        <div className="relative" ref={menuRef}>
            <Share onClick={() => setOpen(!open)} className="cursor-pointer" />
            {open && (
                <div className=" absolute top-full left-1/2 mt-2 transform -translate-x-1/2 p-3 flex gap-3 bg-neutral-950 place-content-center">
                    <a href={shareLinks.twitter} target="_blank">
                        <FaTwitter size={22} />
                    </a>
                    <a href={shareLinks.reddit} target="_blank">
                        <FaRedditAlien size={22} />
                    </a>
                    <a href={shareLinks.facebook} target="_blank" >
                        <FaFacebook size={22} />
                    </a>
                    <a href={shareLinks.whatsapp} target="_blank">
                        <FaWhatsapp size={22} />
                    </a>
                    <a href={shareLinks.telegram} target="_blank">
                        <FaTelegram size={22} />
                    </a>
                </div>
            )}
        </div>
    );
}
