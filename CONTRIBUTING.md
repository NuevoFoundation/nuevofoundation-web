### Installing Dependencies

- [Node JS](https://nodejs.org/en/download/)
- NPM (included with Node JS installation)
- Git 
- Preferred Text Editor, [try VS Code](https://code.visualstudio.com/download)

You can validate that node js is installed on your computer by running `node -v` if you get a version number you're all set. If it's an older version of node you should update it. 

I'll assume you already have git installed on your machine. To verify you can run `git --version` in your command line. If not installed, you can find an installation [here](https://git-scm.com/downloads).

### Clone the Repo

From your terminal clone the [nuevofounation-web repo](https://github.com/NuevoFoundation/nuevofoundation-web) to any directory on your machine.
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
