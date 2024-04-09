const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config({ path: '.env' });

// Create Server
const app = express();
// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ extended: true }));
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Access Control Config
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Routes /api/v1
const api = process.env.API_URL;
app.use(`${api}/user`, require('./routes/user'));
app.use(`${api}/team`, require('./routes/team'));
app.use(`${api}/tournament`, require('./routes/tournament'));
app.use(`${api}/notifications`, require('./routes/notifications'));

// App Port
const port = process.env.PORT

app.listen(port, '0.0.0.0', () => {
    console.log(`### Server is run in port ${port} ###`)
})
