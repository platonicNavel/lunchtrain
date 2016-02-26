const express = require('express');
const app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// force should be false/ommitted in production code
const init = require('./db/dummyData');

init().then(() => {
  console.log('Server is listening on port 8000');
  app.listen(8000);
});
