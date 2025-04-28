const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect('mongodb+srv://traveller:Manoj123@traveller.ots9ysb.mongodb.net/community-forum', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected!');
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = connectDB;
