import {Card, CardContent, CardFooter} from "../ui/card.jsx";
import {useEffect, useState} from "react";
import {Button} from "../ui/button.jsx";
import {useIsAuthenticated} from "../../hooks/useIsAuthenticated";
import {Heart, HeartOff} from "lucide-react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../../components/ui/select";
import {useLike} from "../../hooks/useLike.js";

export default function JokeViewer() {
    const [joke, setJoke] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
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
        } catch (err) {
            console.error(err);
        }
    }

    const handleLike = async () => {
        if (joke) {
            await likeJoke(joke);
        }
    }

    return (
        <Card className="w-full max-w-md mx-4 sm:mx-0">
            <CardContent className="flex flex-col items-center text-center space-y-4">
                <p className="text-lg">{joke ? joke.value : "Click the button to get a joke!"} </p>

                {joke && (
                    <div onClick={handleLike} className="cursor-pointer">
                        {isAuthenticated
                            ? isLiked(joke)
                                ? <Heart className="fill-current"/>
                                : <Heart/>
                            : <HeartOff/>
                        }
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex flex-col items-center text-center space-y-4">
                <Button  onClick={() => fetchJoke(selectedCategory)} className="w-full cursor-pointer">Generate</Button>
                <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Joke Categories</SelectLabel>
                            <SelectItem key="all" value="all" className="cursor-pointer">
                                Select category
                            </SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat} className="cursor-pointer">
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardFooter>
        </Card>
    )
}