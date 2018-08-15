const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./models/Survey');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

//tell express to use body parser and use req.body
app.use(bodyParser.json());

//tell express we need cookie for session
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [ keys.cookieKey ]
  })
);
//tell passport to use cookie session
app.use(passport.initialize());
app.use(passport.session());

//Google OAuth
require('./routes/authRoutes')(app);

//Stripe
require('./routes/billingRoutes')(app);
//Survey routes
require('./routes/surveyRoutes')(app);

//only run in production
if(process.env.NODE_ENV === 'production') {
  //express will server up production assets
  app.use(express.static('client/build'));

  //express will server up index.html in build
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`We are good at port ${PORT}`);
})