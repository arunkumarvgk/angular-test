# Login application
  Simple Angular Application to test login, Form validations, Routing, services etc

## Requirements

For building and running the application you need:

- [Node 12, NPM 6](https://nodejs.org/en/)
- [Angular 9](https://cli.angular.io/)

## Install Dependencies

Run `npm install`

## Run server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Paths

### Register
  `http://localhost:4200/register`  
  ##### Allows user to register, also contains the requested emailID validation, Password min Length 6 validation.
 
### Login
`http://localhost:4200/login`  
 ##### User should be registered to login. If the user is already logged in redirects to Home page

### Home  
`http://localhost:4200/home`
##### Available only after login 

## Note
Have used local storage to save the registered users, later validated againsts them during login
