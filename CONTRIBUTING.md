# Contributing to Nuevo Foundation

Thank you for considering contributing to the Nuevo Foundation! Your contributions help us inspire kids to be curious, confident, and courageous by discovering the world of STEM (Science, Technology, Engineering, and Mathematics).

## Code of Conduct

Please read and follow our [Code of Conduct](link-to-code-of-conduct) to ensure a welcoming and inclusive environment for all contributors.

## Getting Started

### Installing Dependencies

- [Node JS](https://nodejs.org/en/download/) (Ensure you're using version 14)
- NPM (included with Node JS installation)
- Git 
- Preferred Text Editor, [try VS Code](https://code.visualstudio.com/download)

You can validate that node js is installed on your computer by running `node -v` if you get a version number you're all set. If it's an older version of node you should update it. 

I'll assume you already have git installed on your machine. To verify you can run `git --version` in your command line. If not installed, you can find an installation [here](https://git-scm.com/downloads).

### Clone the Repo

From your terminal clone the [nuevofoundation-web repo](https://github.com/NuevoFoundation/nuevofoundation-web) to any directory on your machine.
```
$ git clone https://github.com/NuevoFoundation/nuevofoundation-web.git
```

### Install application node packages
Once cloned, navigate into the application root directory, `nuevofoundation-web`. Next install all the node package dependencies for the react app. 

```
$ npm install --save
```
Now start the application with npm start. Once started the application should automatically open your browser to localhost on port 3000. 
```
$ npm start
```

### Running the Project Locally

To run the project locally, follow these steps:

1. **Clone the Repository**: `git clone https://github.com/NuevoFoundation/nuevofoundation-web.git`
2. **Navigate to the Project Directory**: `cd nuevofoundation-web`
3. **Install Dependencies**: `npm install`
4. **Start the Development Server**: `npm start`
5. **Open the App in Your Browser**: [http://localhost:3000](http://localhost:3000)

## Issue Guidelines

When opening an issue, please provide as much detail as possible, including:

- A clear and descriptive title.
- A detailed description of the issue.
- Steps to reproduce the issue.
- Any relevant screenshots or logs.
- The expected behavior and the actual behavior.

If applicable, please use the provided issue templates to ensure all necessary information is included.

## Pull Request Guidelines

When submitting a pull request, please follow these guidelines:

### Branch Naming Conventions

Use the following naming conventions for your branches:

- `feature/your-feature-name` for new features.
- `bugfix/your-bugfix-name` for bug fixes.
- `hotfix/your-hotfix-name` for urgent fixes.

### Writing Clear Commit Messages

Write clear and concise commit messages that describe the changes made. Use the following format:

```
[Type] Short description of the change

Detailed description of the change (if necessary).
```

### Ensuring Code Quality

Before submitting your pull request, ensure your code meets the following criteria:

- Run linters to check for code style issues.
- Run tests to ensure all tests pass.
- Ensure your code follows the project's coding standards.

## Review Process

Once you submit a pull request, it will be reviewed by the project maintainers. During the review process, you may receive feedback or requests for changes. Please address the feedback promptly and update your pull request accordingly.

## Additional Resources

- [Nuevo Foundation Website](https://www.nuevofoundation.org)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/?view=azure-devops)
- [Uptime Robot Documentation](https://uptimerobot.com/dashboard.php)
- [GitHub Documentation](https://docs.github.com/en)
- [Node.js Documentation](https://nodejs.org/en/docs/)
