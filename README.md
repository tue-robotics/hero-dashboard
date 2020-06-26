# hero-dashboard
[![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-image-dev]][daviddm-url-dev] [![optionalDependencies Status][daviddm-image-optional]][daviddm-url-optional]

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br />
You can find the most recent version of this guide [here](https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md)

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Opens an dev server on [http://localhost:3000](http://localhost:3000).

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run electron-start`

Runs electron connected to the dev server on [http://localhost:3000](http://localhost:3000).<br />
By default it connects to the rosbridge webserver on `localhost`.

To connect to a different rosbridge webserver,
add the desired hostname or ip-address as argument.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `npm run electron`

Runs electron on the builded version in production mode.<br />
By default it connects to the rosbridge webserver on the current host.

To connect to a different rosbridge webserver,
add the desired hostname or ip-address as argument.

[travis-image]: https://travis-ci.com/tue-robotics/hero-dashboard.svg?branch=master
[travis-url]: https://travis-ci.com/tue-robotics/hero-dashboard

[daviddm-image]: https://david-dm.org/tue-robotics/hero-dashboard/status.svg
[daviddm-url]: https://david-dm.org/tue-robotics/hero-dashboard
[daviddm-image-dev]: https://david-dm.org/tue-robotics/hero-dashboard/dev-status.svg
[daviddm-url-dev]: https://david-dm.org/tue-robotics/hero-dashboard?type=dev
[daviddm-image-optional]: https://david-dm.org/tue-robotics/hero-dashboard/optional-status.svg
[daviddm-url-optional]: https://david-dm.org/tue-robotics/hero-dashboard?type=optional
