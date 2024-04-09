const mongoose = require('mongoose');
require('dotenv').config({ path: '.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('### Successful DB connection ###');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;