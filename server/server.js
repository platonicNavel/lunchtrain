/*
This application uses a Node.js server with the Express web application framework.

The server is broken up into logical components with a separation of concerns to enhance clarity
and avoid confusion.  The components are as follows:

* server.js - bare bones server initialization

* auth.js - employs Passport authentication middleware to serialize and deserialize users while
  ensuring users are authenticated during site access attempts

* config.js - contains client id and client secret as well as a toggle for devMode (which prevents
  the need for constant authentication during testing)

* middleware.js - Contains all middleware for our application

* routes.js - Handles routing to all pages on our site

* slack.js - Handles all functionality related to Slack integration with our application

* utils.js - Contains all utility functions
*/

const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

// force should be false/ommitted in production code
const init = require('./db/dummyData');

init().then(() => {
  console.log(`Server is listening on port ${port}`);
  app.listen(port);
});

module.exports = app;
