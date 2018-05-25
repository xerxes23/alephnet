const express = require('express');
const mongoose = require('mongoose');

// App initialization
const app = express();

// BD Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err))


// App home route
app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
