# E2E Testing Framework - SauceDemo

## Description

This project contains E2E UI tests for the SauceDemo application using Playwright.
It includes UI Test for features under functionality such login and shopping cart.

## Test Strategy
- Smoke tests for critical flows (login, add to cart)
- Regression tests for edge cases (invalid login, persistence, removal)

## Design - Page Object Model
I used the Page Object Model to keep the tests organized and easy to maintain.
Each page has its own class with locators and basic actions (like login or add item), so tests focus on user behavior instead of UI details.
This also makes it easier to update things if the UI changes, since everything is centralized.

## Tagging
@smoke and @regression tags are used to simplify execution and separate critical and extended scenarios.

## Improvement (future works)
Basic UI performance validation (response time checks) could be added to ensure key actions do not take too long.

## Project structure

* Tests are located in the `e2e` folder and they are divided into two main folders: desktop and mobile.
* Configuration files are located in the root of the project.
  * `playwright-desktop.config.js`: Configuration file for desktop tests
  * `playwright-mobile.config.js`: Configuration file for mobile tests
* Following POM, pages are located in `pages`

### Running the tests from local

* Run ALL tests
  `npm run test`

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
