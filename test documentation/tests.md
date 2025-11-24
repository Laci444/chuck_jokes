| Test Case ID | Cél | Módszer / Steps | Várt eredmény | Eredmény |
|--------------|-----|-----------------|----------------|----------|
| TC001 | Viccek listázása | GET /api/jokes/ | JSON lista a viccekről, status 200 | Passed |
| TC002 | Egy vicc lekérése | GET /api/jokes/<id>/ | JSON a megadott viccről, status 200 | Passed |
| TC003 | Lájkok listázása | GET /api/jokes/<id>/likes/ | JSON lista lájkokról, status 200 | Passed |
| TC004 | Lájk hozzáadása | POST /api/jokes/<id>/likes/ | Lájk rögzül, status 201 | Passed |
| TC005 | Lájk törlése | DELETE /api/jokes/<id>/likes/ | Lájk törlődik, status 204 | Passed |
| TC006 | Bejelentkezés | POST /auth/token/ body: {email, password} | JSON access és refresh token, status 200 | Passed |
| TC007 | Regisztráció | POST /auth/register/ body: {email, password} | Felhasználó létrejön, status 201 | Passed |
| TC008 | Token frissítés | POST /auth/token/refresh/ body: {refresh} | Új access token, status 200 | Passed |
| TC009 | Hibás bejelentkezés | POST /auth/login/ body: {email, wrong_password} | Hiba JSON, status 401 | Passed |
| TC010 | Hibás regisztráció | POST /auth/register/ body: {invalid_email, password} | Hiba JSON, status 400 | Passed |
| TC011 | Admin felület elérhetősége | GET /admin/ | Oldal betöltődik, status 200 | Passed |
| TC012 | API séma lekérése | GET /schema/ | Tartalmazza az openapi kulcsot, status 200 | Passed |
| TC013 | Swagger UI elérhetősége | GET /schema/swagger-ui/ | Oldal betöltődik, status 200, tartalmazza SwaggerUIBundle | Passed |
| TC014 | Redoc dokumentáció elérhetősége | GET /schema/redoc/ | Oldal betöltődik, status 200, tartalmazza redoc | Passed |