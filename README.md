# fast-food-fast

[![Build Status](https://travis-ci.com/daniellamarr/fast-food-fast.svg?branch=ch-setup-travisci-continous-160380786)](https://travis-ci.com/daniellamarr/fast-food-fast)

[![Coverage Status](https://coveralls.io/repos/github/daniellamarr/fast-food-fast/badge.svg)](https://coveralls.io/github/daniellamarr/fast-food-fast)

[![Maintainability](https://api.codeclimate.com/v1/badges/9752e8b10c002296fd75/maintainability)](https://codeclimate.com/github/daniellamarr/fast-food-fast/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/9752e8b10c002296fd75/test_coverage)](https://codeclimate.com/github/daniellamarr/fast-food-fast/test_coverage)

# Fast food fast

Fast food fast is a food delivery service app for a restaurant

## Getting Started

Clone the Repo.
-------------
Run npm install to install all necessary packages.

### Prerequisites

The following tools will be needed to run this application successfully:

Node v8.11.3 or above
---
Npm v5.6 or above
---

### ENDPOINTS

- GET **/api/v1/orders** Get all orders on the platform
- GET **/api/orders/:id** Get a specific order based on the id passed
- POST **/api/v1/orders** Place a new order
- PUT **/api/v1/orders** Update the status of an order

### Installing

## On your Local Machine
- Pull the **develop** branch off this repository
- Run **npm install** to install all dependencies
- Run npm start to start the app
- App runs on port 6060
- Access endpoints on **localhost:6060**
## On Heroku
- Pull the **develop** branch off this repository
- Run **npm install** to install all dependencies
- Access endpoints on **daniellamarr-fast-food-fast.herokuapp.com**

## Running the tests

Run `npm test` in the terminal for the cloned folder.

### Break down into end to end tests

- It tests the API end-point.
- It tests the REST API functionality

### Deployment on Heroku Server

- Create an account on Heroku.
- Select **ch-deploy-application-heroku-160469940** to deploy on.
- Run **heroku push ch-deploy-application-heroku-160469940:master** to deploy


## Built With

* [Node.js](http://www.nodejs.org/) - Runtime-Enviroment

## Authors

* **Daniel Anyaegbu**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments

* medium.freecodecamp.org
* The Andela Team
* google.com
