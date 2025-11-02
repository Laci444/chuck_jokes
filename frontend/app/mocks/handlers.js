import {http, HttpResponse} from 'msw';

const fakeUserDB = [
    { id: 1, username: "user1", email: "user1@example.com", password: "pass1"},
]

let nextId = 2;

export const handlers = [
    http.post('/auth/login', async ({ request }) => {
        const { username, password } = await request.json()

        const user = fakeUserDB.find(
            (u) => u.username === username && u.password === password
        )

        if (!user) {
            return HttpResponse.json(
                { message: 'Invalid username or password' },
                { status: 401 }
            )
        }

        const token = `fake-jwt-token-${user.id}-${Date.now()}`

        return HttpResponse.json(
            {
                user: { id: user.id, username: user.username },
                token,
            },
            {status: 200,}
        )
    }),
    http.post('/auth/register', async ({request}) => {
        const { username, email, password } = await request.json()

        const userExists = fakeUserDB.some(user => user.username === username || user.email === email)

        if (userExists) {
            return HttpResponse.json({ message: 'Username or email already exists' }, { status: 409 })
        }

        const newUser = {
            id:nextId++,
            username,
            email,            // save email too
            password,
        }

        fakeUserDB.push(newUser)

        const token = `fake-jwt-token-${newUser.id}-${Date.now()}`

        return HttpResponse.json(
            {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                },
                token,
            }, {status: 200}
        )
    }),
    http.post('/auth/logout', () => {
        return HttpResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        )
    }),
    http.get('/user/profile', ({ request }) => {
        const authHeader = request.headers.get('Authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const token = authHeader.replace('Bearer ', '')
        const match = token.match(/^fake-jwt-token-(\d+)-\d+$/)

        if (!match) {
            return HttpResponse.json({ message: 'Invalid token' }, { status: 403 })
        }

        const userId = match[1]
        const user = fakeUserDB.find(u => u.id === userId)

        if (!user) {
            return HttpResponse.json({ message: 'User not found' }, { status: 404 })
        }

        return HttpResponse.json({
            id: user.id,
            username: user.username,
            email: user.email,
        })
    }),
    http.post('/api/jokes', async ({ request }) => {
        try {
            const {jokeId, joke} = await request.json();

            if(!jokeId || !joke) {
                console.error('[MSW] Invalid joke payload:', {jokeId, joke})
                return HttpResponse.json(
                    {message: 'Invalid joke payload' },
                    {status: 400}
                )
            }

            console.log('joke saved by liking:', {jokeId, joke})

            return HttpResponse.json(
                {message: 'Joke saved successfully'},
                {status: 200}
            )
        } catch (error) {
            console.error('[MSW] Unable to jokes saved by liking:', error)
            return HttpResponse.json(
                {message: 'Internal mock server error'},
                {status: 500}
            )
        }
    })

]