# Stocks App

## Introduction

A personal project, post Makers, to solidify knowlege in developing full-stack JavaScript application. The aim is to hit multiple other different endpoints, such as relevant stock market news feeds, to provide a rich user experience.

## Deployed Application

The live application is deployed [here](https://project-stocks-app.herokuapp.com/)

## Features

- User Sign-up / Authentication
- Save user preferences
- Allow user to select stocks to watch
- Allow user to set limits and set alerts when limits exceeded
- Provide user with a smooth interface to search and view company share prices
- Have news feed with latest relevant stock market news
- Provide a mock trading enviroment
- Provide a way to buy stocks (??? definetely a stretch goal)
- Provide trading tips (??? might be a stretch goal!)
- deal with password resets etc
- email confirmations
- Google OAuth


## Technologies

- **Backend:** NodeJS, Express, MongoDB. Tested with Jest and Supertest
- **Frontend:** ReactJS. Testing with Jest and Enzyme


## Dependencies

On the client side the following dependancies are used:

- **axios** - HTTP client for making requests to back end
- **classnames** - used to add conditional classes to jsx files
- **react-redux** - allows redux to be used with react
- **react-router-dom** - used for web page routing in the react application
- **redux** - manages state between react components

On the server side the following dependancies are used:

- **bcryptjs** - popular dependancy used to hash passwords
- **body-parser** - body parsing middleware (extracts the body portion of incoming request and exposes to req.body). Potentially not require as Express 4.16+ has the ability to parse json in a similar manner to body-parser
- **concurrently** - allows frontend (react) and backend (express) servers to run simultaneously on different ports, used in the production environment
- **express** - web application server framework for node
- **jsonwebtoken** - used for authentication
- **mongoose** - used to interact with mongoDB
- **passport** - Authentication middleware for node js, well suited to Express apps
- **validator** - used to validate inputs (like passwords, emails, usernames etc)


