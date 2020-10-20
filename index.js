//import statements
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectdb=require('./config/db');
const filestore=require('express-file-store')

// database connection
connectdb();
//parsing body of the HTML
app.use(bodyParser.json())
app.use(express.json({ extended: false }));

//adding routes
app.use('/api/users/register',require('./routes/register'));
app.use('/api/users/login',require('./routes/auth'));
app.use('/api/profile',require('./routes/profile'));
app.use('/api/admin/createquiz',require('./routes/quiz'));
app.use('/api/user/getquiz',require('./routes/getquiz'));
//server operantions
app.post("/", (req, res) => {
  res.send(req.body);
});


//port config
const port = process.env.PORT || 5000;

app.listen(port, () => console.log( `Server running on port ${port} 🔥`));
