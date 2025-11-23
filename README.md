# Chuck Jokes App

A web application where users can view, like, and share jokes.  
Backend: Django | Frontend: React + Vite

## Installation steps

### Backend

- install python 3.10+
- create virtual environment: `python -m venv env`
- activate environment: for Linux: `source env/bin/activate` for Windows: `env\Scripts\activate`
- install dependencies: for Linux: `python -m pip install -f requirements.txt` for Windows: `pip install -r requirements.txt`
- create local database: `python manage.py migrate`
- run development server: `python manage.py runserver`
- (optional) create superuser to access admin panel: `python manage.py createsuperuser`

### Frontend

- install Node.js 18+
- install frontend dependencies:: `npm install`
- Run frontend: `npm run dev`

## External APIs / Links

### The project uses the following external resources:
- Chuck Norris Jokes API – For fetching random jokes: https://api.chucknorris.io/

- API used for gif fetching (GIPHY): https://developers.giphy.com/docs/sdk/

- Documentation about where to get Beta API Key: https://developers.giphy.com/docs/api/#quick-start-guide

- Site to test out API calls for GIPHY: https://developers.giphy.com/explorer/