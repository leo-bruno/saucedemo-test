# E2E Testing Framework - SauceDemo and Petstore

## Description
This project contains E2E UI and API tests for the SauceDemo and Petstore application using Playwright.
Under SauceDemo page, it includes UI Test for features under feature or business functionality such login and shopping cart.
Under Petstore app, it includes API tests for pet and store functionality

## Test Strategy
- Smoke tests for critical flows
- Regression tests for edge cases

## UI Test Design - Page Object Model
It uses the Page Object Model to keep tests organized and easy to maintain.
Each page has its own class with locators and basic actions (like login or add item), so tests focus on user behavior instead of UI details.
This also makes it easier to update things if the UI changes, since everything is centralized.

## API Test Design - Client layer
A dedicated client layer is used (e.g. PetClient.ts and StoreClient.ts) to encapsulate HTTP requests. For example, createPet(), deleteStore, etc

## Tagging
@smoke and @regression tags are used to simplify execution and separate critical and extended scenarios.

## Improvement (future works)
Basic UI performance validation (response time checks) could be added to ensure key actions do not take too long.

## Project structure
* Tests are located in the `e2e` folder. 
  * UI tests are divided into two main folders: desktop and mobile. 
  * API tests are divided by object, for example pet and store
* Configuration files are located in the root of the project (package.json).
  * `playwright-desktop.config.js`: Configuration file for desktop tests
  * `playwright-mobile.config.js`: Configuration file for mobile tests
  * `playwright-api.config.js`: Configuration file for API tests
* Following POM, pages are located in `pages`
* Following Client layers, clients are located in `api` 

## Test Structure
For UI Tests, they are grouped by feature or business functionality using `test.describe()` (e.g. Shopping Cart, Login), following a user-centric approach. One describe contains feature or business functionality, 2-3 test per describe.
For API tests, they are grouped by endpoint using `test.describe()`. One describe per endpoint, 2-3 test per endpoint.

### Running the tests from local

## How to run API tests
* Run API tests
  `npm run test:api`

## How to run UI tests
* Run ALL Desktop test
 `npm run test:desktop`

* Run ALL Mobile test
  `npm run test:mobile`

* Run Desktop test using annotation @smoke
  `npm run test:desktop:smoke`

* Run Mobile test using annotation @smoke
  `npm run test:mobile:smoke`

* Run Desktop test using annotation @regression
  `npm run test:desktop:regression`

* Run Mobile test using annotation @regression
  `npm run test:mobile:regression`

* Run Desktop test using the UI
  `npm run test:desktop:ui`

* Run Mobile test using the UI
  `npm run test:mobile:ui`

NOTE: Remember to be using node version >18, in case you need to change version, you should do `nvm use 20`


# Architecture Decisions

## Why Playwright for both UI and API
Playwright is used for both UI and API testing to maintain consistency across the testing stack.
This approach allows sharing configuration and execution workflows, reducing complexity and avoiding the need to maintain separate frameworks or projects.

## Page Object Model in the UI
It is used to separate test logic from UI locators, improve maintainability and reduce duplication.

## Client Abstraction in the API
It is used to separate tests from request implementation

## Tagging Strategy
- @smoke for critical flow
- @regression for extender coverage

## CI/CD
The project is designed to be integrated into CI/CD pipelines (e.g. GitLab CI).
Configuration is environment-driven: the `baseURL` is dynamically resolved from environment variables when available, with a fallback to a local default defined in the `*.config.js` files.
