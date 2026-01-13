const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const seedAdmin = async () => {
    try {
        const username = 'admin13';
        const password = 'password123';

        let user = await User.findOne({ username });
        if (user) {
            console.log('Admin user already exists');
            process.exit();
        }

        user = new User({ username, password, role: 'admin' });
        await user.save();
        console.log(`Admin created. Username: ${username}, Password: ${password}`);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
