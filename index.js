const bodyParser = require('body-parser');
const express = require('express');
const port = 3000;
const app = express();

require('./db');
require('./models/User');
console.log('hello');
const UserFile =require('./models/User');
const authRoutes = require('./routes/authRoutes');
const requiredToken =require('./Middleware/AuthTokenRequired');

app.use(bodyParser.json());
app.use(authRoutes);


app.get('/',requiredToken ,(req, res) => {

    console.log(req.user)
    res.send(req.user);

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})