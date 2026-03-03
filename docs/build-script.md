# Build-Script Dokumentation

## Übersicht

Powerform verwendet Webpack als Build-Tool zum Kompilieren von SCSS zu CSS und zum Bundlen von JavaScript-Dateien. Diese Dokumentation erklärt die Verwendung der verfügbaren Build-Scripts.

## Voraussetzungen

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

## Installation

Vor der ersten Verwendung müssen die Dependencies installiert werden:

```bash
npm install
```

Dies installiert alle benötigten Pakete aus der `package.json` in den Ordner `node_modules/`.

## Verfügbare Scripts

### Build-Befehle

#### Produktions-Build
```bash
npm run build
```
Erstellt einen optimierten Produktions-Build:
- Minifiziert CSS und JavaScript
- Entfernt Source Maps
- Optimiert für Performance
- Ausgabe in `assets/css/` und `assets/js/`

**Verwendung:** Vor dem Deployment oder Release.

#### Development-Build
```bash
npm run build:dev
```
Erstellt einen Development-Build:
- Inkludiert Source Maps für einfacheres Debugging
- Keine Minifizierung
- Schnellere Build-Zeit

**Verwendung:** Während der Entwicklung für einmaliges Kompilieren.

#### Watch-Modus
```bash
npm run watch
```
Startet den Watch-Modus:
- Überwacht Dateiänderungen automatisch
- Kompiliert bei jeder Änderung neu
- Ideal für aktive Entwicklung
- Source Maps aktiviert

**Verwendung:** Während der aktiven Entwicklung dauerhaft im Hintergrund laufen lassen.

#### Clean
```bash
npm run clean
```
Löscht alle kompilierten Dateien:
- Entfernt `*.min.css` und `*.map` aus `assets/css/`
- Entfernt `*.min.js` und `*.map` aus `assets/js/`
- Löscht `assets/fonts/*` und `assets/images/*`

**Verwendung:** Vor einem frischen Build oder bei Build-Problemen.

### Code-Qualität

#### JavaScript Linting
```bash
npm run lint:js
```
Überprüft JavaScript-Code auf:
- Syntax-Fehler
- Code-Style-Verletzungen
- Potenzielle Bugs

#### CSS/SCSS Linting
```bash
npm run lint:css
```
Überprüft SCSS-Code auf:
- Syntax-Fehler
- Style-Verletzungen
- Best Practices

#### Code-Formatierung
```bash
npm run format
```
Formatiert JavaScript und SCSS automatisch nach definierten Regeln.

## Webpack-Konfiguration

Die Build-Konfiguration befindet sich in `webpack.config.js`. Sie definiert zwei separate Builds:

### SCSS-Build
- **Eingang:** `assets/scss/shared-ui.scss`, `assets/scss/powerform-scgen.scss`
- **Ausgang:** `assets/css/shared-ui.min.css`, `assets/css/powerform-scgen.min.css`
- **Features:**
  - SCSS-Kompilierung
  - Autoprefixer (PostCSS)
  - CSS-Minifizierung
  - Font/Image-Verarbeitung

### JavaScript-Build
- **Eingang:** `assets/js/shared-ui.js`
- **Ausgang:** `assets/js/shared-ui.min.js`
- **Features:**
  - Babel-Transpilierung (ES6+ → ES5)
  - Module-Bundling
  - Automatisches Laden von Dependencies (ClipboardJS, A11yDialog, Select2)

## Workflow-Beispiele

### Entwicklung starten
```bash
# Dependencies installieren (nur beim ersten Mal)
npm install

# Watch-Modus starten
npm run watch
```
Jetzt werden Änderungen an SCSS/JS-Dateien automatisch kompiliert.

### Vor einem Commit
```bash
# Code überprüfen
npm run lint:js
npm run lint:css

# Formatieren
npm run format

# Produktions-Build erstellen
npm run build
```

### Release vorbereiten
```bash
# Alte Builds entfernen
npm run clean

# Frischen Produktions-Build erstellen
npm run build
```

## Dateistruktur

```
powerform/
├── assets/
│   ├── scss/           # SCSS-Quelldateien
│   │   ├── shared-ui.scss
│   │   └── powerform-scgen.scss
│   ├── js/             # JavaScript-Quelldateien
│   │   └── shared-ui.js
│   ├── css/            # Kompilierte CSS-Dateien (Ausgabe)
│   │   ├── shared-ui.min.css
│   │   └── powerform-scgen.min.css
│   ├── fonts/          # Verarbeitete Schriftarten (Ausgabe)
│   └── images/         # Verarbeitete Bilder (Ausgabe)
├── webpack.config.js   # Webpack-Konfiguration
├── postcss.config.js   # PostCSS-Konfiguration (Autoprefixer)
└── package.json        # NPM-Konfiguration & Scripts
```

## Troubleshooting

### Build schlägt fehl
1. `node_modules/` löschen: `rm -rf node_modules/`
2. Dependencies neu installieren: `npm install`
3. Clean durchführen: `npm run clean`
4. Build erneut versuchen: `npm run build`

### Watch-Modus erkennt Änderungen nicht
- Watch-Modus neu starten
- Polling-Intervall ist auf 500ms eingestellt (siehe `webpack.config.js`)

### Veraltete Node-Version
```bash
# Node-Version prüfen
node --version

# Sollte >= 16.0.0 sein
```

### Permission-Fehler
```bash
# Mit sudo installieren (Linux/Mac)
sudo npm install

# Oder npm-Rechte korrigieren
sudo chown -R $(whoami) ~/.npm
```

## Weiterführende Informationen

- [Webpack Dokumentation](https://webpack.js.org/)
- [Babel Dokumentation](https://babeljs.io/)
- [Sass Dokumentation](https://sass-lang.com/)
- [PostCSS Dokumentation](https://postcss.org/)
