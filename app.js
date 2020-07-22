const express = require('express');
const bodyParser = require('body-parser');
const postrges = require('./src/databases/postgres');
const app = express();
const passport = require('passport');

app.use(bodyParser.json());
app.use(passport.initialize());
require('./src/middleware/passport')(passport);
app.use('/user', require('./src/routers/user'));
app.listen(5000, () => {
    postrges.openConnection().catch();
    console.log('starts');
})
