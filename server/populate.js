import mongoose from 'mongoose';
import User from './models/user';

const users = [
    {
        email: 'laurie@mail.com',
        username: 'Laurie007',
    },
    {
        email: 'oscar@mail.com',
        username: 'Oscarino',
    },
    {
        email: 'poule@mail.com',
        username: 'Picoti',
    },
    {
        email: 'isabelle@mail.com',
        username: 'Kitten',
    },
    {
        email: 'lolilol@mail.com',
        username: 'spam3000',
    },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/hiking', { useMongoClient: true });

// Go through each user
users.map(data => {
    // Initialize a model with user data
    const user = new User(data);
    // and save it into the database
    user.save();
});