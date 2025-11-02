const mockJokesDB = [];

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
}