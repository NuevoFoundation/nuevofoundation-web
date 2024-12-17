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
    <br>
    Azure DevOps: This badge shows the current build status of the project.
  </a>

  <a href="https://uptimerobot.com/dashboard.php">
    <img src="https://img.shields.io/uptimerobot/status/m795338142-320d0e1e6e99445154a6ac55" alt="Nuevo Foundation Production Website">
    <br>
    Uptime Robot: This badge shows the current status of the Nuevo Foundation Production Website.
  </a>

  <a href="https://uptimerobot.com/dashboard.php">
    <img alt="Uptime Robot ratio (30 days)" src="https://img.shields.io/uptimerobot/ratio/m795338142-320d0e1e6e99445154a6ac55">
    <br>
    Uptime Robot Ratio: This badge shows the uptime ratio of the Nuevo Foundation Production Website over the last 30 days.
  </a>

  <a href="https://www.nuevofoundation.org">
    <img src="https://img.shields.io/badge/website-https://www.nuevofoundation.org/-blue.svg" alt="Nuevo Foundation Website">
    <br>
    Nuevo Foundation Website: This badge provides a link to the official Nuevo Foundation website.
  </a>
</p>

<hr />

## Introduction

Welcome to the Nuevo Foundation Website repository! We're thrilled to have you here. Whether you're a developer, designer, or just someone interested in our mission, there's something for everyone.

### About Nuevo Foundation

The Nuevo Foundation is dedicated to inspiring kids to be curious, confident, and courageous by discovering the world of STEM (Science, Technology, Engineering, and Mathematics). Our goal is to provide students with the tools and opportunities they need to succeed in these fields.

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

## Development Setup

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Troubleshooting Tips

- **Common Issue 1**: If you encounter an error related to missing dependencies, try running `npm install` to ensure all dependencies are installed.
- **Common Issue 2**: If the app fails to start, check if there are any conflicting processes using the same port (default is 3000). You can change the port by setting the `PORT` environment variable.
- **Common Issue 3**: If you encounter issues with environment variables, ensure that the `.env` files are correctly set up and contain the necessary variables.

### Getting Started Guide

1. **Clone the Repository**: `git clone https://github.com/NuevoFoundation/nuevofoundation-web.git`
2. **Navigate to the Project Directory**: `cd nuevofoundation-web`
3. **Install Dependencies**: `npm install`
4. **Start the Development Server**: `npm start`
5. **Open the App in Your Browser**: [http://localhost:3000](http://localhost:3000)

## React Docs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Why React?

React is a powerful JavaScript library for building user interfaces. It allows for the creation of reusable UI components, making development more efficient and maintainable. By using React, we can ensure that our website is fast, responsive, and easy to update.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Additional Resources

- [Nuevo Foundation Website](https://www.nuevofoundation.org)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/?view=azure-devops)
- [Uptime Robot Documentation](https://uptimerobot.com/dashboard.php)
- [GitHub Documentation](https://docs.github.com/en)
- [Node.js Documentation](https://nodejs.org/en/docs/)

## Contributing

Please see our [Contributing Guide](/CONTRIBUTING.md)
