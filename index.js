const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { autoIndex: false });


const app = express();

//Google OAuth
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`We good at port ${PORT}`);
})