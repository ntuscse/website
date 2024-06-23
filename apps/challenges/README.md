# Challenges Backend Service 

This is the backend service for the Challenges feature for the SCSE Club.

## Before you start...

1. Make sure you have prettier and eslint enable in your IDE. <p>
    > For visual studio code user, please install and enable [eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
2. Read the [code practices section](#code-practices) written in this README.md before you start coding. You are strongly recommended to follow them, or at least discuss with your teammates first before changing any of these rules.

## Installation
Run `yarn` to install all dependencies.

## Scripts
0. `yarn` for installing dependencies.
1. `yarn dev` for starting the server.
2. `yarn test` for running test cases.

## Code practices
0. The codebase is designed with controller-service-repository architecutre. Please strictly follow the architecture when writing your code.<p>
    > You may refer to this [blog](https://tom-collings.medium.com/controller-service-repository-16e29a4684e5) for more info.
1. Catch and handle error as close to error as possible. This would mean catching the error in controller layer, and sending the error response in controller layer instead of the error handler middleware. This is heavily discussed in src/middleware/errorHandler.ts. The reason being:
    1. <b>Better logging: </b><br>
By catching the error at controller layer (or as close to where the error is thrown), we can log the error as close to where the error happen as possible.This will greatly help with debuggging. <p>
    2. <b>Enforce how custom error response should be handled: </b><br>
There might be scenarios where some endpoint would want to return a customised error response body instead of a general one. In that scenario, we should definitely throw it in controller layer, instead of modifying error handler middleware to handle that, since it would make error handler middleware to become super fat to handle all those different custom logic that will only be used in one scenario. Error handler middleware will literally become a god function, which is very bad. <br>
By enforcing that error handling logic should be done in controller layer, we would encourage developers to keep the custom error handling logic in controller layer instead of one common error handling function.<p>
    3. <b>Ambuigity: </b><br>
If one is not familiar with Express, you would find out that when there is an uncaught error, the error middleware will be called, but this behavior is not mentioned anywhere in the code. It would looks like magic to beginner, which is not very beginner friendly.
