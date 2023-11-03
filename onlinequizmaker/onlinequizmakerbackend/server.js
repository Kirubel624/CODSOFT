const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const IP_ADDRESS = '0.0.0.0';

dotenv.config({
  path: "./config.env",
});

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// ////console.log(process.env)
mongoose
  .connect(
    // process.env.LOCAL_DB,
    db,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Db connection successful! ..........");
  });
// Your server logic
// Define a route that you'll use for pinging
app.get('/ping', (req, res) => {
  res.send('Server is awake!');
});
cron.schedule('*/5 * * * *', () => {
  // Use the HTTP module to send a request to your server
  http.get('https://quiztime-wjxb.onrender.com/', (resp) => {
    console.log('Pinged the server');
  });
});
app.listen(9000, IP_ADDRESS, () => {
  console.log("the server is running........");
});
