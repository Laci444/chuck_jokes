import {Card, CardContent, CardFooter} from "../ui/card.jsx";
import {useEffect, useState} from "react";
import {Button} from "../ui/button.jsx";
import {useIsAuthenticated} from "../../hooks/useIsAuthenticated";
import {Heart, HeartOff, Share} from "lucide-react";
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue
} from "../../components/ui/select";
import {useLike} from "../../hooks/useLike.js";
import useShare from "../../hooks/useShare.js";
import ShareMenu from "../../components/ShareMenu.jsx";
import {toast} from "sonner";

export default function JokeViewer() {
    const [joke, setJoke] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [gifUrl, setGifUrl] = useState(null);
    const shareLinks = useShare(joke?.value);
    const isAuthenticated = useIsAuthenticated();
    const {likeJoke, isLiked} = useLike();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://api.chucknorris.io/jokes/categories")
                const data = await response.json()
                setCategories(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchCategories();
    }, []);

    const fetchJoke = async (category) => {
        try {
            const url = category && category !== "all"
                ? `https://api.chucknorris.io/jokes/random?category=${category}`
                : "https://api.chucknorris.io/jokes/random";

            const response = await fetch(url)
            const data = await response.json();
            setJoke(data);
            setGifUrl(null);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchGif = async () => {
        const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=chuck+norris&rating=pg-13`);
            const data = await response.json();
            setGifUrl(data.data?.images?.downsized_medium?.url || null);

        } catch (err) {
            console.error(err);
        }
    }

    const handleLike = async () => {
        if (isAuthenticated && joke) {
            await likeJoke(joke);
            await fetchGif();
        } else {
            toast("Please login to like the joke!");
        }
    }

    return (
        <div className="flex flex-row items-center">
            <Card className="w-full max-w-md mx-4 sm:mx-0 z-10">
            <CardContent className="flex flex-col items-center text-center space-y-4">
                    <p className="text-lg">{joke ? joke.value : "Click the generate button to get a joke!"} </p>
                    <div className="flex flex-row items-center space-x-4">
                        {joke &&
                            (<div onClick={handleLike} className="cursor-pointer">
                                {isAuthenticated ? isLiked(joke) ?
                                        <Heart className="fill-current"/>
                                        : <Heart/> :
                                    <HeartOff className="disabled"/>}
                            </div>)}
                        <ShareMenu shareLinks={shareLinks}/>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center text-center space-y-4">
                    <Button onClick={() => fetchJoke(selectedCategory)} className="w-full cursor-pointer">Generate</Button>
                    <Select onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full cursor-pointer">
                            <SelectValue placeholder="Select category"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Joke Categories</SelectLabel>
                                <SelectItem key="all" value="all" className="cursor-pointer">
                                    Select category
                                </SelectItem>
                                {categories.map((cat) => (<SelectItem key={cat} value={cat} className="cursor-pointer">
                                    {cat}
                                </SelectItem>))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardFooter>
            </Card>

            {gifUrl &&
                (
                    <div className="relative left-0 z-0 ">
                        <img
                            src={gifUrl}
                            alt="Chuck Norris gif"
                            className="w-full max-h-64 object-contain rounded slideInSlow"
                        />
                    </div>
                )}
        </div>
    )
}