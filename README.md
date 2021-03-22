### Find My Drivers Backend - Finding nearby drivers through using mapbox.

#### Table of contents

- [Introduction](#Introduction)

- [Technologies](#Technologies)

- [Setup](#Setup)

- [Environment Variables](#Environment-Variables)

- [Availble Scripts](#Available-Scripts)

- [Package Issues](#Package-issues)

- [Improvements](#Improvements)

#### Introduction

This project was build on Express and node.js, using mongoDB as our database.

The goal of the backend was to do :

1. Get all saved locations of a user.
2. Add new save locations of a user.
3. delete save locations of a user.

Hence, a model called locations has been created to store name of saved location and coordinates, with a schema of

```
{ name: string, coordinates : { lat: number, lng: number } }
```

The Coordinates are made as sub-schema of the main schema to allow for expansion for more field such as location name, description and etc in the future.

For routes, we are currently using REST api, only GET, POST and DELETE. PUT and PATCH use case are not available at the moment. However, implementation for such use case like changing location name and description can useful with PATCH or PUT in the future.

Cors is applied to whitelist the frontend URl that we are using for the backend.

nodemon is also used to allow monitoring of script during the development of the backend.

For code wise, I tried to add testing into the code, hence, the use of supertest, jest and mongodb-memory-server is present. However, I do like to highlight that the test is not concise right now.

Link to Frontend: https://github.com/nicchunglow/find-my-drivers
A working life demo in available through frontend, hosted on netlify.

## Features Demo

Working live demo can be accessed at https://find-my-drivers-backend.herokuapp.com/
The live working demo is hosted on heroku, linked to mongoDB atlas.
As it is hosted on Heroku, the backend will take some time to spin up on the initial load.

#### Technologies

    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mongoose": "^5.12.0"

##### DevDependencies:

    "eslint": "^7.21.0",
    "husky": "4.3.8",
    "jest": "^26.6.3",
    "mongodb-memory-server": "^6.9.6",
    "nodemon": "^2.0.7",
    "prettier": "^2.2.1",
    "pretty-quick": "^3.1.0",
    "supertest": "^6.1.3"

#### Setup

To run this project, git clone and install it locally using npm:

```

$ cd ../

$ git clone git@github.com:nicchunglow/find-my-drivers-backend.git

$ npm install

$ npm start

```

## Available Scripts

In the project directory, you can run:

```
    "start": "node src/index.js",
    "start:dev": "nodemon src/index.js ",
    "test": "jest",
    "testc": "jest --coverage --watchAll",
    "testd": "jest --detectOpenHandles --watchAll"
```

For husky, we have a pre-commit to lint our code
"pre-commit": "pretty-quick --staged"

## Available Routes

```
   0: "GET   /locations",
    1: "POST /locations/create",
    2: "DELETE /locations",
```

## Environment Variables

FRONTEND_URL="https://find-my-drivers.netlify.app"
MONGODB_URI= // to connect to mongodb locally or using mongodb Atlas

## Improvements

I would like to make several improvements in this project if I were to revisit it again.

I would :

1. Add more test with more edge cases to make the code rebust and maintainable.
2. Add a user route so that there is account access for users and maintaining of individual data used instead of sharing the data.
   technologies to be implemented with this feature would be jwtoken for authentication, bcrypt for hashing and uuid for unique identifier. I would change the unique identifier of the location along with the accounts. 
 3. Implement PATCH api call so that people are able to edit their saved data. 
