<h1 align="center">

<br>

<img src="./public/favicons/apple-touch-icon-144x144.png" alt="Nuevo Foundation" width="128">

<br>
<br>

Nuevo Foundation

</h1>

<h3 align="center">Welcome to the Frontend for the Official Nuevo Foundation Website</h3>

<p align="center">
  <a href="https://dev.azure.com/project-unicorn/nuevo/_build/latest?definitionId=3&branchName=master">
    <img src="https://dev.azure.com/project-unicorn/nuevo/_apis/build/status/NuevoFoundation.nuevofoundation-web?branchName=master" alt="Azure DevOps">
  </a>

  <a href="https://uptimerobot.com/dashboard.php">
    <img src="https://img.shields.io/uptimerobot/status/m795338142-320d0e1e6e99445154a6ac55" alt="Nuevo Foundation Production Website">
  </a>

  <a href="https://uptimerobot.com/dashboard.php">
    <img alt="Uptime Robot ratio (30 days)" src="https://img.shields.io/uptimerobot/ratio/m795338142-320d0e1e6e99445154a6ac55">
  </a>

  <a href="https://www.nuevofoundation.org">
    <img src="https://img.shields.io/badge/website-https://www.nuevofoundation.org/-blue.svg" alt="Nuevo Foundation Website">
  </a>
</p>

<hr />

## Code Layout
    .
    ├── src     
    │   ├── assets               # fonts, icons, logos, images, stylesheets used in app
    │   ├── components          
    │   |   ├── blog             # Components related to the blog page functionality
    │   |   ├── member           # Components related to member dashboard
    │   |   ├── registration     # UI elements related to authentication functionality
    │   |   ├── static
    |   │   |   ├── common       # Common contains shared UI elements like buttons, header, footer, and nav items.
    |   │   |   ├── pages        # Pages directory contains components for each page displayed on site
    │   |   ├── virtualSessions  # UI elements related to virtual sessions functionality
    │   ├── helpers              # utility methods like validating authentication, date time formatting, json web token decoding, etc.
    │   ├── models               # objects used accross app, typically used as types for persistence to Nuevo API
    │   ├── services             # classes to make networks requests to Nuevo API like creating virtual session or fetch blogs from wordpress
    ├── .env.development         # Environment variables used during development
    ├── .env.straging            # Environment variables used for staging
    ├── .env.production          # Environment variables used for production
    ├── Const.ts                 # Constants used accross app like API url or Google Analytics Tracking id
    ├── .eslintrc.json           # eslint configuration file
    ├── jest.config.json         # Jest testing framework configuration file
    ├── tsconfig.json            # TypeScript configuration file
    ├── azure-pipelines.yml      # Build definition file used by Azure DevOps
    └── README.md

## React Docs
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Contributing

Please see our [Contributing Guide](/CONTRIBUTING.md)
