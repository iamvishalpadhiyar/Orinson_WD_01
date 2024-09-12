const mongoose = require('mongoose');
const Contact = require('./models/Contact')

mongoose.connect('mongodb://localhost:27017/contactform')
    .then(() => {
        Contact.deleteMany({})
            .then(() => {
                console.log('All documents deleted from the Contact collection');
                mongoose.connection.close();
            })
            .catch(err => {
                console.error('Error deleting documents from the Contact collection:', err);
                mongoose.connection.close();
            });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
