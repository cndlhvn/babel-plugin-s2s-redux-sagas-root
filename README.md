# babel-plugin-s2s-redux-sagas-root

> generate redux sagas root

## Install

```
$ yarn add --dev babel-plugin-s2s-redux-sagas-root
```

## s2s.config.js

s2s-redux-sagas-root plugin watch the `src/sagas/(?!.*index).*\.js` files

```js
module.exports = {
  watch: './**/*.js',
  plugins: [
    {
      test: /src\/sagas\/(?!.*index).*\.js/,
      output: "index.js",
      plugin: ['s2s-redux-sagas-root',
      { input: 'src/sagas/*.js', output: "src/sagas/index.js" }]
    }
  ]
}
```
## Start s2s

Start the s2s with yarn command

`yarn run s2s`

## Usage

#### When create a saga file

When you create a `src/sagas/*.js`, this plugin inserts sagas into index.js automatically.

For example you create a `src/sagas/user.js`. It is inserted into index.js

#### Out:

```js
import { all } from "redux-saga/effects";
import user from "./user";
export default function* rootSaga() {
  yield all([
    ...user
  ]);
}
```

# Test

This plugin has two type of test files. \
First is babel plugin main test file named `test.js` on root direcotry. \
Next is `test/*.js` that is test target files.

Run this command.

` npm run test`

Test will run and you can see what happen.
