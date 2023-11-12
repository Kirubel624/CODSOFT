const express = require('express');
const cors = require('cors');
const authRouter=require('./routes/authRoutes')
const jobRouter=require('./routes/jobRoutes')

const app = express();


app.use(cors());

app.use(express.json());
app.use("/user",authRouter)
app.use("/job",jobRouter)

app.all("*", (req, res, next) => {

  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
