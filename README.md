# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

This project is a front-end Angular application that displays Olympic data (e.g., countries, medals, events). It was developed as part of the training "Développez le front-end en utilisant Angular" and aims to demonstrate mastery of Angular concepts and best practices.


## Project Structure & Architecture

```
src/
│
├── app/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components (e.g., home, details)
│   ├── services/         # Angular services (e.g., OlympicService)
│   ├── models/           # TypeScript interfaces and types
│   ├── app.module.ts     # Root module
│   └── app.component.ts  # Root component
│
├── assets/
│   └── mock/             # Mock JSON data
│
├── environments/         # Environment configs
└── index.html, main.ts   # Entry points
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


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lostmart/Developpez-le-front-end-en-utilisant-Angular
   cd telesport-olympic-dashboard
   ```

App should run at: http://localhost:4200



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you to start by understanding this starter code. Pay an extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the typescript interfaces inside the `models` folder. As you can see I already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` by the corresponding interface.

You're now ready to implement the requested features.

Good luck!
