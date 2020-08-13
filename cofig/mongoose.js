// require the library

const mongoose = require('mongoose');

// connect to the databaseK
mongoose.connect('mongodb://localhost/contact_list_db');
// acquire the connection to check if it is successful
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, 'connection error:'));
// up and running the print message
db.once('open', function() {
    console.log("Successfully connected to the database")
  });
 