# SupreMemes (Client)

This application was created to give users the ability to create custom memes

<br/>

## Authors
Will Chestnut - wchestnuti27 - view my individual github page at https://github.com/wchestnuti27

Daniel Marsh - dmmarsh114 - view my individual github page at https://github.com/dmmarsh114

Nathan Gaffney - NathanGaffney - view my individual github page at https://github.com/NathanGaffney

<br/>

## App Features
* Create memes by using local image files
* Stores memes in an user acct page
* Gives a user the ability to vote on each meme
* Allows users the ability to edit custom meme comment
* Allows the user the ability to delete the meme on the acct page

<br/>

## Demo

### Posting a Meme

<img src="https://media0.giphy.com/media/QVbU9QDUoHArzVCemD/giphy.gif">

<br/>

### Editing a Comment and Deleting the Meme

<img src="https://media2.giphy.com/media/gI5veKVsaeUSzov6Zq/giphy.gif">

<br/>

## Endpoints: 

#### User:
* /user/signup - create an account
* /user/login - login to an existing account
* /user/users - returns all users, along with their posts and their comments

#### Feed:
* /feed/all - returns all memes
* /feed/:username - returns all memes posted by specified user

#### Voting:
* /vote/:postId - updates the vote count

#### Memes: 
* /mymemes/new - upload a meme
* /mymemes/ - returns all memes posted by the logged in user
* /mymemes/delete/:postId - deletes the specified meme

<br/>

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```sh
npx create-react-app my-app
cd my-app
npm start
```

<br/>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

<br/>

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
