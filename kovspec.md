# Áttekintés
A cél egy olyan weboldal létrehozása, ahol a látogatók véletlenszerűen generált vicceket tudnak lekérni. A rendszer biztosítja a regisztrációt és a bejelentkezést, valamint a kedvelések alapján rangsort állít fel, így a felhasználók a top vicceket is böngészhetik. 
# Igényelt üzleti folyamatok
A felhasználó a főoldalon kezdeményezi a  bejelentkezést, amely egy külön oldalon  folytatódik. A sikeres bejelentkezést követően elérhetővé válik a kedvelés funkció, amely rögzítésre kerül az adatbázisba. Ezek alapján a rendszer automatikusan felállít egy rangsort, amely a "Top jokes" oldalon jelenik meg. 
# Követelménylista
| Modul      | Id | Név                                | Verzió | Kifejtés  |
|:----------:|:--:|:----------------------------------:|:------:|:-----------|
|Jogosultság |K1  |Bejelentkezési felület              |1.0     |A felhasználó a felhasználónév és jelszó alapján bejelentkezhet. Ha a megadott felhasználónév és/vagy jelszó nem megfelelő, akkor hibaüzenet jelenik meg.|
|Jogosultság |K2  |Regisztráció                        |1.0     |A felhasználó a felhasználó nevének, e-mail címének és jelszavának megadásával regisztrálhatja magát. A jelszó tárolása kódolva történik az adatbázisban. Ha valamelyik adat ezek közül hiányzik vagy nem megfelelő, akkor a rendszer értesíti a felhasználót.|
|Jogosultság |K3  |Jogosultsági szintek                |1.0     |- Bejelentkezett felhasználó: Random viccek lekérése, viccek kedvelése <br> - Látogató: Random viccek lekérése |
|Modifikáció |K4  |Felhasználó módosítása              |1.0     |A felhasználó módosítani tudja saját felhasználónevét.|
|Felület     |K5  |Jelszó/felhasználónév módosítása    |1.0     |A felhasználó módosítani tudja a felhasználónevét vagy jelszavát. Ehhez szükséges a régi és az új felhasználók megadása, az új megerősítése, valamint a felhasználó jelszavának megadása. |
|Felület     |K6  |Bejelentkezés		       |1.0     |A felhasználók itt tudnak bejelentkezni a rendszerbe. |
|Felület     |K7  |Viccek lekérése                     |1.0     |Véletlenszerű viccek jelennek meg a főoldalon. |
|Felület     |K8  |Kedvelés                            |1.0     |A felhasználó kedvelheti a viccet, ezek rögzítésre kerülnek az adatbázisban. |
|Statisztika |K9  |Top viccek                          |1.0     |A kedvelések alapján automatikusan elkészül a top viccek listája. |