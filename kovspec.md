
# Követelményspecifikáció

## Áttekintés

A cél egy olyan weboldal létrehozása, ahol a látogatók véletlenszerűen generált vicceket tudnak lekérni. A rendszer biztosítja a regisztrációt és a bejelentkezést, valamint a kedvelések alapján rangsort állít fel, így a felhasználók a top vicceket is böngészhetik. 
A rendszer továbbá biztosítja a napi „Joke of the Day” funkciót, amely minden nap egy random viccet jelenít meg, valamint megosztási és like esetén megjelenő GIF funkciókat is tartalmaz.

## Jelenlegi helyzet:

A mostani felgyorsult világ egyre jobban előhozza a stresszt az emberekben ezért egy vicceket tartalmazó oldal gyors feloldódási eszköznek bizonyosulhat. Mivel a telefon majdnem mindenki zsebében ott van, így egy viccportál könnyen elérhető weboldalnak minősül.

## Vágyálom rendszer:

A projekt célja egy olyan reszponzív felületű webalkalmazás, amelyen  a felhasználó a regisztrációt követően elmentheti a neki tetsző vicceket azok like-olásával. A felület legyen átlátható, könnyen kezelhető, hogy a navigálás gyors és egyszerű legyen a felhasználók számára. Statisztikát le lehessen kérni az oldalról, hogy mely viccek voltak a legnépszerűbbek az adott vicc like mennyiségét figyelve.
Az alkalmazás biztosítson napi kiemelt viccet (Joke of the Day), látványos visszajelzést like esetén (GIF animáció), valamint lehetőséget a viccek megosztására is.

## Funkcionális követelmények

- **Felhasználói funkciók**: regisztráció, bejelentkezés, random vicc lekérése, like, kedvencek listázása, profil adatok módosítása, Joke of the Day megtekintése, vicc megosztása, like-GIF animáció megjelenítése.
- **Adminisztrációs funkciók**: felhasználók kezelése, viccek statisztikáinak megtekintése.
- **Rendszer funkciók**: biztonságos hitelesítés (JWT), adatbázisban viccek és like-ok tárolása, hibakezelés.

## Rendszerre vonatkozó törvények, szabályok, ajánlások:

- **A weboldal megfelel az alábbi törvényeknek:**
    - Mivel a mi oldalunk szeretne felhasználókat azonosítani, ezért az alábbi szükséges jogszabályokat bekell tartani:
        - [GDPR](https://gdpr-info.eu/)
        - [ePrivacy Directive](https://gdpr.eu/cookies/)
    - Felhasznált szabványok:
        - A webfelület szabványos eszközökkel készüljön (HTML, CSS, JavaScript)
    - Ajánlás:
        - A web oldal legyen akadálymentes ([WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/))

## Jelenlegi üzleti folyamatok modellje

Jelenleg a felhasználók csak az API-ból érhetnek el random vicceket, like-olás és statisztika nélkül.

Ez a folyamat egyszerű, de **korlátozott élményt nyújt**, mivel a felhasználók csak véletlenszerű vicceket olvasnak, anélkül hogy közösségi vagy személyre szabott funkciók állnának rendelkezésre.

Az új alkalmazás célja: regisztráció, személyre szabott élmény (kedvencek, toplista), biztonságos adatkezelés és közösségi funkciók biztosítása.

## Igényelt üzleti folyamatok

A felhasználó a főoldalon kezdeményezi a  bejelentkezést, amely egy külön oldalon  folytatódik. A sikeres bejelentkezést követően elérhetővé válik a kedvelés funkció, amely rögzítésre kerül az adatbázisba. Ezek alapján a rendszer automatikusan felállít egy rangsort, amely a "Top jokes" oldalon jelenik meg.

## Követelménylista

| Modul      | Id | Név                                | Verzió | Kifejtés  |
|:----------:|:--:|:----------------------------------:|:------:|:-----------|
|Jogosultság |K1  |Bejelentkezési felület              |1.0     |A felhasználó a felhasználónév és jelszó alapján bejelentkezhet. Ha a megadott felhasználónév és/vagy jelszó nem megfelelő, akkor hibaüzenet jelenik meg.|
|Jogosultság |K2  |Regisztráció                        |1.0     |A felhasználó a felhasználó nevének, e-mail címének és jelszavának megadásával regisztrálhatja magát. A jelszó tárolása kódolva történik az adatbázisban. Ha valamelyik adat ezek közül hiányzik vagy nem megfelelő, akkor a rendszer értesíti a felhasználót.|
|Jogosultság |K3  |Jogosultsági szintek                |1.0     |- Bejelentkezett felhasználó: Random viccek lekérése, viccek kedvelése <br> - Látogató: Random viccek lekérése |
|Modifikáció |K4  |Felhasználó módosítása              |1.0     |A felhasználó módosítani tudja saját felhasználónevét.|
|Felület     |K5  |Jelszó/felhasználónév módosítása    |1.0     |A felhasználó módosítani tudja a felhasználónevét vagy jelszavát. Ehhez szükséges a régi és az új felhasználónév megadása, az új megerősítése, valamint a felhasználó jelszavának megadása. |
|Felület     |K6  |Bejelentkezés		       |1.0     |A felhasználók itt tudnak bejelentkezni a rendszerbe. |
|Felület     |K7  |Viccek lekérése                     |1.0     |Véletlenszerű viccek jelennek meg a főoldalon. |
|Felület     |K8  |Kedvelés                            |1.0     |A felhasználó kedvelheti a viccet, ezek rögzítésre kerülnek az adatbázisban. |
| Felület | K9 | Joke of the Day         | 1.0    | A felhasználó minden nap megtekintheti az aktuális napi viccet. |
| Felület | K10 | Like GIF visszajelzés   | 1.0    | A vicc like-olása esetén egy rövid GIF animáció jelenik meg. |
| Felület | K11 | Vicc megosztása         | 1.0    | A felhasználó megoszthatja a vicceket közösségi oldalakon vagy közvetlen link formájában. |
|Statisztika |K12  |Top viccek                          |1.0     |A kedvelések alapján automatikusan elkészül a top viccek listája. |

## Riportok

### Szabad riport
**Kérdés:** Hogyan kellene működnie az új rendszernek?

**Válasz:**
A rendszer egy olyan weboldalként fog működni, ahol a felhasználók véletlenszerűen generált vicceket tudnak megjeleníteni. A felületnek gyorsnak és könnyen kezelhetőnek kell lennie, mert a cél az, hogy a felhasználó azonnal hozzájusson egy új vicchez. A működés során a felhasználó elsőként a főoldalon lát egy random viccet, ezt egy háttérben lefutó API-hívás adja vissza. A random vicc minden frissítéskor újra lehívódik.

A rendszer támogatja a regisztrációt és a bejelentkezést is. A felhasználó a regisztráció után tudja like-olni a vicceket, és ezek a like-ok bekerülnek az adatbázisba. A kedvelések alapján automatikusan képződik egy rangsor, ami a top viccek listája lesz. Ezt a felhasználó bármikor megtekintheti egy külön oldalon.

A rendszernek minden nap ki kell választania egy "Joke of the Day" viccet. Ez random, de fontos, hogy a nap folyamán már nem változik, tehát a rendszer elmenti, melyik vicc lett az adott napra kisorsolva. A felhasználó, amikor a napi viccre kattint, mindig ugyanazt látja az adott napon belül.

A like gomb működésekor meg kell jelennie egy animált GIF-nek, ami visszajelzésként szolgál. Ez nem módosítja a vicc tartalmát vagy a rendszer logikáját, csak vizuális visszacsatolást ad. A megosztási funkció lehetővé teszi, hogy a felhasználó a viccet közvetlen linken vagy valamelyik közösségi platformon megossza.

A felhasználók jelszavai titkosítva kerülnek elmentésre. A meglévő API használatban marad a viccek lekéréséhez, azonban a like-ok, felhasználók és statisztikák már saját adatbázisban tárolódnak. 

A rendszernek kezelnie kell azokat az eseteket is, amikor a felhasználó nem jelentkezett be. Ilyenkor csak random viccet lát, de nem tud kedvelni vagy toplistát megtekinteni. A vendégfelhasználók számára biztosítani kell a folyamatos, gyors tartalomelérést, ugyanakkor korlátozott funkciókat kell kínálni, amelyek nem igényelnek bejelentkezést. Fontos, hogy az oldalon történő navigáció reszponzívan történjen, tehát mobileszközökön ugyanúgy használható legyen, mint számítógépen.

Elvárás, hogy a rendszer a GDPR követelményeinek megfelelően működjön, mivel személyes adatokat kezel. A weboldalnak szabványos technológiákkal kell készülnie, és a hozzáférhetőségi ajánlásokat célszerű figyelembe venni.

Felhasználói oldalról nézve a rendszer lényege, hogy gyors, egyszerű, szórakoztató élményt nyújtson, minimális lépésekkel. Admin oldalon lehetőség van a felhasználók listázására és a viccek statisztikáinak megtekintésére, vagyis arra, hogy melyik vicc mennyi like-ot kapott.

A rendszer működésében nem lehetnek hiányzó esetek: például figyelni kell arra, hogy egy felhasználó ugyanazt a viccet csak egyszer like-olhassa, illetve hogy a napi vicc ne változzon menet közben. 

### Irányított riport
1. **Hogyan kapják a vicceket?**
   Random API-hívással.
2. **Milyen adatokat tárol a rendszer?**
   Felhasználók, viccek, like-ok.
3. **Mit tehet a felhasználó?**
   Vicc megtekintése, like, toplista böngészése.
4. **Hogyan biztosítjuk a biztonságot?**
   Titkosított jelszavak, jogosultságkezelés.

## Fogalomtár:

- HTML: Hypertext Markup Language
- CSS: Cascading Style Sheet
- Reszponzív felület: Mobilon, tableten, PC-n igazodik a  képernyőhöz a felület mérete, azaz több eszközön is probléma nélkül üzemelhet
- Bejelentkezett felhasználó: van fiókja regisztrálva ami miatt nem vesznek el az adatai az oldal frissítése után
- Látogató: nincs regisztrált fiókja, ha frissíti az oldalt akkor elveszíti az adatait
