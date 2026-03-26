# Testing Report

## 1. UI Testing

### Architecture
- Page Object Model (POM)
- Separation of concerns between tests and UI logic

### Test Coverage
- Login
- Shopping cart (add/remove/persistence)

### How to execute
#### Run ALL Desktop test
  `npm run test:desktop`

#### Run ALL Mobile test
  `npm run test:mobile`


## 2. API Testing

### Architecture
- API Client abstraction
- Tests grouped by endpoint

### Test Coverage
- Create Pet (POST)
- Get Pet (GET)
- Create Store (POST)
- Delete Store (DELETE)

### How to execute
`npm run test:api`


## 3. Key Design Decisions

- Single framework (Playwright) for UI and API
- Environment-based configuration
- Tagging strategy for test execution


## 4. Future Improvements

- Test data management strategy
- Improve error handling strategy