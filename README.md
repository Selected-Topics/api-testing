# CI/CD With APIDOG - Selected Topics Assignment
## Assignment Overview

This project is an assignment for the "Selected Topics" course, focusing on implementing Continuous Integration and Continuous Deployment (CI/CD) using APIDOG for API testing. The project demonstrates the integration of modern development practices with automated testing workflows.

## Group Members

| Name                | ID            | Section |
|---------------------|--------------|---------|
| Surafel Workayehu   | UGR/9709/13  | 1       |
| Daniel Misganaw     | UGR/6303/13  | 2       |
| Zelalem Habtamu     | UGR/7301/13  | 1       |
| Yohannes Bekele     | UGR/3361/13  | 1       |
| Yeabtsega Yifat     | UGR/9766/13  | 1       |

## Project Details

This project implements a backend API using NestJS and sets up a CI/CD pipeline using GitHub Actions and APIDOG for API testing. The implementation includes:

- RESTful API endpoints for user management, products, and orders
- JWT-based authentication system
- MongoDB database integration
- Automated testing with APIDOG
- CI/CD pipeline implementation

### CI/CD Pipeline (.github/workflows/api-test.yml)

The CI/CD workflow automates the testing process with the following features:

- Triggers on pull requests to the main branch
- Sets up Node.js environment and MongoDB service
- Installs project dependencies
- Runs the application
- Executes API tests using Apidog CLI
- Generates and uploads test reports
- Posts test results to pull request comments

The workflow includes specific test scenarios for:
- Product management
- Order processing
- Authentication
- Seed data validation

## Project Setup

```bash
$ npm install
```

## Running the Project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

The API documentation is available through APIDOG and includes endpoints for:

- User Authentication
- Product Management
- Order Processing
- Health Checks

## Technologies Used

- NestJS
- MongoDB
- JWT Authentication
- GitHub Actions
- APIDOG
- Node.js
- TypeScript

## License

This project is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
