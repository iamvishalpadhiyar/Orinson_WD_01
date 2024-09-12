const mongoose = require('mongoose');
const Contact = require('./models/Contact'); 

mongoose.connect('mongodb://localhost:27017/contactform')
    .then(async () => {
        console.log('Connected to MongoDB');

        const contacts = await Contact.find();

        contacts.forEach(contact => {
            console.log(`Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}, Service: ${contact.service}, Message: ${contact.message}`);
        });

        mongoose.connection.close();
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));
