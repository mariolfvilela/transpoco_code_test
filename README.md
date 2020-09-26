# transpoco_code_test

## Software Developer code test

[![Actions Status](https://github.com/mariolfvilela/transpoco_code_test/workflows/workflow%20Transpoco%20code%20test/badge.svg)](https://github.com/mariolfvilela/transpoco_code_test/actions)

## Project's goal

##### This is a test project for Transpoco in order to assess my technical skills. I had never developed in NodeJs, it was a challenge, with gains in experience and knowledge

## Technologies

---

Main technologies used in the code.

💻 [Node.js](https://nodejs.org/)

🧰 [Typescript](https://www.typescriptlang.org/)

✅ [Jest](https://jestjs.io/)

📦 [MySql](https://www.npmjs.com/package/mysql2)

🛠 [Github Actions](https://github.com/features/actions) `CI-CD` [Umbler](http://transpoco-code-test-com.umbler.net/)  - [Azure](https://transpoco.azurewebsites.net/trackers) 

📝 [Swagger Editor](http://editor.swagger.io/)

## How to run the project:

1. In the file `src/config.js`

- Update the `API_URL` to the address and port where the backend is running, for example: 'http://localhost:3000'

2. At the terminal, execute `yarn` to install the dependencies and then `yarn start:local` to execute the project which by default will be available in [http://localhost:3000](http://localhost:3000).

Ready! 🤓

## Available scripts

### `yarn start:local`

Runs in development mode [http://localhost:3000](http://localhost:3000)

### `yarn lint`

Run the [ESLINT](https://eslint.org/) <br />

### `yarn style`

Run the [PRETTIER](https://prettier.io/) <br />

### `yarn style:fix`

Run the [PRETTIER](https://prettier.io/) <br />

### `yarn test`

Run the [Jest](https://jestjs.io/) <br />

---
### Testing routes

- [`home`](http://localhost:3000/) - Documentation.
- GET `/trackers`. [`/trackers`](http://localhost:3000/trackers) - Return a "rank" by max speed and tracker_uid, the API should be able to return the rank ascendant or descendant. `/trackers?orderBy=desc`, `/trackers?orderBy=asc`
- GET `/trackers/1101`. [`/trackers`](http://localhost:3000/trackers/1101) - Return all events filtered by tracker_uid

---

## How to run the web page

---

- 🔗[Click here to see the service - Azure](https://transpoco.azurewebsites.net/trackers) ´´´´under construction´´´´

- 🔗[Click here to see the service - Umbler](http://transpoco-code-test-com.umbler.net/)
