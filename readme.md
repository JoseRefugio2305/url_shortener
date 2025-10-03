# URL Shortening Service

This is a URL shortener service, with an API developed in [Flask](https://flask.palletsprojects.com/en/stable/) and a frontend in [React JS](https://react.dev/) making use of [Vite](https://vite.dev/).

It allows user registration and login, as well as consulting, creating, updating, deleting and viewing statistics of the URLs shortened by the user.

[Click on the following image to see a video of the application running on YouTube](https://www.youtube.com/watch?v=FEa2diI2qgA)


[![Project clip](./assets/1.png)](https://www.youtube.com/watch?v=uGxzIu5lGfQ "Project clip")

[![Project clip](./assets/2.png)](https://www.youtube.com/watch?v=uGxzIu5lGfQ "Project clip")

## Table of Contents

-  [Features](#features)
-  [Getting Started](#getting-started)
-  [Technologies Used](#technologies-used)
   -  [API](#api)
   -  [Client](#client)

## Features

-  User registration and login with authentication via JWT tokens.
-  Creation, recovery, updating, deletion and obtaining statistics of shortened URLs.
-  Redirection via shortened URL

## Getting Started

Each project has a readme.md file in its respective folder with instructions for installation and use in a local environment.

## Technologies Used

In the following section, the different technologies used in the implementation of the system will be listed.

### API

-  [Python 3.8+](https://www.python.org/)
   -  Framework [Flask](https://flask.palletsprojects.com/en/stable/)
   -  ORM [SQLAlchemy](https://www.sqlalchemy.org/)
   -  Password encryption [bcrypt](https://pypi.org/project/bcrypt/)
   -  Authentication with JWT using [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/en/stable/)
-  [MySQL](https://www.mysql.com/)

### Client

-  [Typescript](https://www.typescriptlang.org/)
-  [Node JS 20+](https://nodejs.org/es/)
   -  [Vite](https://vite.dev/)
   -  Framework [React JS](https://es.react.dev/)
   -  Framework CSS [TailwindCSS](https://tailwindcss.com/)
   -  UI component library [Flowbite React](https://flowbite-react.com/)
   -  HTTP Client [Axios](https://axios-http.com/es/docs/intro)
-  Package manager [pnpm](https://pnpm.io/es/)
