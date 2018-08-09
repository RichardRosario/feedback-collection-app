const express = require('express');
require('./services/passport');

const app = express();

//Google OAuth
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`We good at port ${PORT}`);
})