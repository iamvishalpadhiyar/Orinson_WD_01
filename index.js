const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Contact = require('./models/Contact');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        const contact = new Contact({ name, email, phone, service, message });

        await contact.save();

        res.send('Thank you for contacting us!');
    } catch (error) {
        console.error('Error saving contact data:', error);
        return res.status(500).send('Error submitting the form. Please try again later.');
    }
});


mongoose.connect('mongodb://localhost:27017/contactform')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));
