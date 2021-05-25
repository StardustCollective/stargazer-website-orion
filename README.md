# Stargazer Website Orion

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# Folder Structure

Before diving into developing features for the Stargazer Website it's important to understand how
everything is structured in the source code.

## Folders
### `• components/`
These directories contain the components that are used throughout the app, the components are split up
into three types; base, composed, and feature.

| Sub Directory      | Description |
| ----------- | ----------- |
| base/       | Components in this directory are reusable dumb components that are used to build composed components. | 
| composed/   | Components in this directory are reusable, dumb, and made up of two or more base components.   | 
| feature/    | Components in this directory are made up of one or more composed components, can be smart, and solve a feature specific problem.     |
## FAQ
### 1. How to know if the component your building is a base, composed, or feature component?

- A base component:
    - Solves a very specific UI problem.
    - Dumb.
    - Reusable.
    - Examples: Input, Text, Button, Icon, Link etc..
- A composed component:
    - Solves a specific UI problem.
    - Made up of 2 or more base components.
    - Reusable.
    - Dumb
    - Examples: Tab Bar, Menu, Header, Search Bar; a search bar is composed of a input and button component.
- A feature components
    - Solves a feature specific problem.
    - Smart
    - May or may not be reusable.
    - Made up of one or more composed components.
    - Example:  A component that collects user registration information. A component that converts DAG to USD.


### 2. I'm building a feature component in which sub-folder does it belong?
In `feature/` you will find that each sub folder matches with the folders found in `page/` there is 1 to 1 relationship.
Save your component to the sub directory that matches the page where you will be implementing your feature.

# Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
