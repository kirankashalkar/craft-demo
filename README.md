To start server:

npm install
./node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline


TODO:
Custom storybook config works with Webpack 2.0. Migrate to 2.0. Need to fix storybook breakage after adding SASS


Bugs:
1. Adding intermediate newlines in editable area broke at some time when going through the data
2. On exceeding limit in editable content area, all sorts of stuff start happening - jumping cursor, red

