const express = require('express');
const cors = require('cors');



const app = express();



// Enable CORS
app.use(cors());

app.use(express.json());


app.all("*", (req, res, next) => {
  // Handle 404 error or other middleware here
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
