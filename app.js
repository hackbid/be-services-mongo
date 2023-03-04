const express = require('express');
const { connectDB } = require('./config/db');

const port = process.env.PORT || 4006;
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log('mongo service run on port ' + port);
    });
});
