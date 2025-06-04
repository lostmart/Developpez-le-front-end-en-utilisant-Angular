# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

This project is a front-end Angular application that displays Olympic data (e.g., countries, medals, events). It was developed as part of the training "Développez le front-end en utilisant Angular" and aims to demonstrate mastery of Angular concepts and best practices.

## Project Structure & Architecture

```
src/
├── app/
│   ├── components/       # Composants réutilisables de l'interface utilisateur
│   │   ├── country-list/         # Liste des pays
│   │   └── country-details/      # Détails d'un pays
│   ├── services/         # Services Angular (e.g., OlympicService)
│   ├── models/           # Interfaces et types TypeScript
│   ├── app-routing.module.ts     # Configuration des routes
│   ├── app.module.ts     # Module principal
│   └── app.component.ts  # Composant racine
├── assets/
│   └── mock/             # Données JSON simulées
├── environments/         # Configurations d'environnement
└── index.html, main.ts   # Points d'entrée de l'application
```

## Features

- Load Olympic data from a local JSON file.

- Display list of participating countries.

- Show number of medals per country.

- Present evolution over the years in a line chart.

## Services

- OlympicService: Loads and provides Olympic data via RxJS observables

- ErrorService Handles error display

## Angular Concepts Used

✅ Angular Modules and Components
✅ Services with Dependency Injection
✅ RxJS: BehaviorSubject, Observable, tap, catchError, map
✅ HTTP requests via HttpClient (even if mock JSON)
✅ Strong typing via TypeScript
✅ Component communication (Input / Output if applicable)
✅ Chart integration using ng2-charts

## 🚀 Getting Started

** Prerequisites **

- Node.js ≥ 16
- Angular CLI ≥ 15

## git clone https://github.com/lostmart/Developpez-le-front-end-en-utilisant-Angular.git

```bash
cd Developpez-le-front-end-en-utilisant-Angular
npm install
ng serve
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lostmart/Developpez-le-front-end-en-utilisant-Angular
   cd telesport-olympic-dashboard
   ```

App should run at: http://localhost:4200

## Deployed version on Netlify

[text](https://olympic-games-app.netlify.app/)
