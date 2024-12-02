require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const instagramRoutes = require('./routes/instagram');
const websiteRoutes = require('./routes/website');

const app = express();
app.use(bodyParser.json());

app.use('/instagram', instagramRoutes);
app.use('/website', websiteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
