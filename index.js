//import statements
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectdb=require('./config/db');
const filestore=require('express-file-store')

connectdb();
app.use(bodyParser.json())
app.use(express.json({ extended: false }));

//adding routes
app.use('/api/users/register',require('./routes/register'));
app.use('/api/users/login',require('./routes/auth'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/admin',require('./routes/quiz'));
//server operantions
app.post("/", (req, res) => {
  res.send(req.body);
});


//port config
const port = process.env.PORT || 5000;

app.listen(port, () => console.log( `Server running on port ${port} 🔥`));
