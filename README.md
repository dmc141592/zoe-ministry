# Zoe Ministry — Website

Neue, eigenständige Website für **Zoe Ministry** (Freikirche, Schweiz).
Gebaut mit Vite, React 18, TypeScript, React Router, Tailwind CSS und
Framer Motion. Reines Frontend, keine Datenbank/Backend nötig.

## Projekt starten

```bash
npm install
npm run dev
```

Die Seite läuft dann unter `http://localhost:5173` (Port kann abweichen,
steht in der Terminal-Ausgabe).

Produktions-Build:

```bash
npm run build   # erzeugt den Ordner dist/
npm run preview # zeigt den Build lokal an
```

## Wo passe ich was an?

Alle Inhalte sind zentral in **`src/data/`** gepflegt — nirgends im Code fest verdrahtet:

| Datei | Inhalt |
|---|---|
| `src/data/site.ts` | Markenname, Tagline, Instagram, Navigation, Standorte, Bankangaben für Spenden |
| `src/data/coreValues.ts` | Die 7 Core Values, Faith Statement (Bekenntnis von Nicäa) |
| `src/data/family.ts` | Family-Team (Vorname, optionaler Nachname, Rolle) für die Bubble-Grafik auf der About-Us-Seite |
| `src/data/vision.ts` | Vision-Statement (Englisch), Sieben Berge |
| `src/data/content.ts` | Predigten (Preach) & Testimonies — Titel und YouTube-Links |
| `src/data/events.ts` | Event-Flyer (Titel, Datum, Ort, Bild) |
| `src/data/store.ts` | Buch "Foundation of Faith", Autor, Merch-Liste |

**Bilder** liegen in `public/images/` (die echten Kunden-Assets: Logo, Buchcover,
Autorenfoto, drei Flyer). Neues Bild hinzufügen → Datei dort ablegen und den
Pfad `/images/dateiname.jpeg` in der jeweiligen Datenquelle referenzieren.

**Farben & Schriften** (Design-System) stehen zentral in `src/index.css` im
`@theme`-Block ganz oben (Tailwind v4 CSS-Konfiguration, keine separate
`tailwind.config.js` nötig):

- `--color-ivory*` — helle/cremefarbene Flächen (About Us, Store)
- `--color-navy*` — dunkle, cineastische Flächen (Home-Hero, Vision, Content, Events, Connect)
- `--color-gold*` — Akzentfarbe
- `--font-display` (Playfair Display), `--font-accent` (Cormorant Garamond), `--font-sans` (Inter)

Seitenaufbau liegt in `src/pages/`, wiederverwendbare Bausteine in
`src/components/` (Layout, UI, Motion/Animation, Sections).

## Platzhalter, die noch ersetzt werden müssen

Alle mit `PLACEHOLDER` markierten Stellen im Code (`src/data/*.ts`) müssen vor
dem Launch noch mit echten Angaben gefüllt werden:

- **Family-Sektion** (`src/data/family.ts`): Nachnamen ergänzen, sobald bekannt; echte Fotos (`image`-Feld) statt der Monogramm-Avatare, sobald vorhanden
- **Autor** (`src/data/store.ts`): echter Name des Autors, Biografie
- **Shopify-Link** (`src/data/store.ts`): Produktlink fürs Buch
- **Merch/Dropship** (`src/data/store.ts`): Sortiment, Preise, Beschreibungen
- **YouTube-Links** (`src/data/content.ts`): echte Videos für Preach & Testimonies
- **Google Kalender** (`.env`): `VITE_GOOGLE_CALENDAR_API_KEY` und `VITE_GOOGLE_CALENDAR_ID` eintragen, siehe Abschnitt unten
- **Bankangaben & TWINT** (`src/data/site.ts`, Objekt `donation`): IBAN, Kontoinhaber, Bank, TWINT-Nummer
- **Kontakt-E-Mail** (`src/data/site.ts`): `site.email` mit der echten Adresse ersetzen

## Google Kalender einrichten

Die Events-Seite zeigt einen eigenen, im Website-Stil gestalteten Kalender
(`src/components/events/StyledCalendar.tsx`), der Termine live über die
Google Calendar API lädt (kein iframe-Embed).

1. Ein Projekt in der [Google Cloud Console](https://console.cloud.google.com/) anlegen (oder ein bestehendes verwenden).
2. Die **Google Calendar API** für dieses Projekt aktivieren.
3. Einen **API-Key** erstellen und auf die Calendar API einschränken (API restrictions → Google Calendar API).
4. In Google Calendar einen Kalender erstellen (oder den bestehenden verwenden) und ihn **öffentlich** machen (Einstellungen → „Für die Öffentlichkeit verfügbar machen“).
5. Die **Kalender-ID** aus den Kalendereinstellungen kopieren (sieht aus wie `xyz@group.calendar.google.com`).
6. Beide Werte in eine lokale `.env`-Datei eintragen (Vorlage: `.env.example`):

   ```
   VITE_GOOGLE_CALENDAR_API_KEY=dein-api-key
   VITE_GOOGLE_CALENDAR_ID=deine-kalender-id@group.calendar.google.com
   ```

Solange `.env` fehlt oder Platzhalterwerte enthält, zeigt der Kalender einen
leeren Zustand ohne Termine ("Kalender wird bald verbunden") statt einen Fehler.

## Hinweise

- Das Kontaktformular (Connect-Seite) nutzt einen `mailto:`-Fallback ohne Backend.
- Die Schweizer Karte auf der Connect-Seite ist bewusst **stilisiert** (kein
  exakter Kartenausschnitt) und markiert die beiden Standorte Solothurn und Zürich.
- Hintergründe auf den dunklen Seiten (Sterne, Leuchten, Filmkorn) sind reine
  CSS/SVG-Effekte — keine externen Stockfotos.
- Die schwarz-gelbe "ZOE GANG"-Wortmarke aus `public/images/zoe-gang-logo-original.jpeg`
  wurde bewusst nicht als Hauptlogo verwendet, da sie laut Kundenfeedback nur
  noch die Event-Reihe kennzeichnet, nicht mehr die Kirche selbst.
