# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To get started:

Create a `.env` file from the `.env-template` containing all environment variables in the root dir

This needs database credentials and google login client id. You can set the `MYSQL_HOST` to `localhost` if running the db locally with docker, and the rest of the db envs will be used to startup that docker container.

You can generate a client id after creating a project through the [Google API dashboard](https://console.cloud.google.com/apis/dashboard)

The `docker-compose` for the sql server uses volumes to persist data between containers, if `docker-compose up` is ran when there is no valid sql database in the volume, then it will reinitialize by running all `.sql` files in the `/init/` folder in alphabetical order. To reset the database, simply run `docker-compose down`, remove the volume with `docker volume ls` followed by `docker volume rm <volume-name>` and restart with `docker-compose up` to reinitialize from the `/init/` folder.

The frontend makes heavy use of redux, and all redux code is within the `/src/data/` directory. Data is initially loaded from the database on login starting in `/src/components/GoogleLoginButton.jsx`. [Redux thunks](https://github.com/reduxjs/redux-thunk) are used for sending requests to the backend and updating the local redux state on response.

#### `npm i` to install the dependencies

#### `docker-compose up` to start the database from .env vars

#### `npm start` to start the react dev server

#### `npm run backend:dev` to start the backend server in development mode with nodemon

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
