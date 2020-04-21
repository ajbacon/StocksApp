[![Build Status](https://travis-ci.com/ajbacon/StocksApp.svg?branch=master)](https://travis-ci.org/ajbacon/makers-bnb)
# Stocks App

## Introduction

A personal project, post Makers, to solidify knowlege in developing full-stack JavaScript applications. The aim is to provide an application where the user can search for company share prices, add them to a watch list  and trade with play money in a mock environment. External API end-points will be hit for the stocks/shares/company profiles and news feeds. My own API has been developed for user authentication and storing user data.  

## Deployed Application

The live application is deployed [here](https://project-stocks-app.herokuapp.com/)

## Current Features

- User Sign-up / Authentication
- Provide user with a smooth interface to search and view company share prices
- get stock data from alphavantage api / finnhub api
- Testing of both client and server

## Next Implementations
- Allow user to select stocks to add to watchlist
- Update and save user profile
- Have news feed with latest relevant stock market news
- Provide a mock trading enviroment

## Future Implmentations
- deal with password resets etc
- email confirmations
- Google OAuth


## Getting Started

First, clone this repository, then:

To install dependencies:
```
npm install
```

To run the app in development mode type in your terminal
```
npm run dev
```
and visit [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Running Tests

To run all the tests, run the following command from the top level directory:

```
npm run test-all
```

Please note that a MongoDB server needs to be running for the server tests to complete, see this external [link](https://docs.mongodb.com/manual/installation/) for details on installation


## Screenshots / GIFs

<img src="images/stocksapp.gif" width="800"


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


