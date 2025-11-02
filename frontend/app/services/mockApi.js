import {mockJokesDB} from "../mocks/mockJokesDB.js"

export const mockApi = {
    async likeJoke(joke) {
        console.log("Mock: saving liked joke", joke);
        mockJokesDB.push({
            id: joke.id,
            value: joke.value,
            likedAt: new Date().toISOString(),
        });
        return { success: true, joke };
    },

    async getTopJokes() {
        const sorted = [...mockJokesDB].sort((a, b) => b.like_count - a.like_count);
        return sorted.slice(0, 10);
    }
}