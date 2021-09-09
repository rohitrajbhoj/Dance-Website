const express = require('express'); // import express from module/package for routing
const path = require('path');
const bodyparser = require('body-parser');
// const fs = require('fs');
const app = express(); // invoke express function
const mongoose = require('mongoose');
const port = 8050; // port to listen

// mongoose Related stuff
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const ContactSchema = new mongoose.Schema({
    urname: String,
    uremail: String,
    urnum: String,
    message: String

});
const Contact = mongoose.model('Contact', ContactSchema);

// EXPRESS Related stuff
app.use('/static', express.static('static')); // for serving static files

app.use(express.urlencoded()); // it will bring form data to the express

// PUG Related stuff
app.set('view engine', 'pug'); // set the template engine pug
app.set('views', path.join(__dirname, 'views')); // set the view directory

// ENDPOINTS
app.get('/', (req, res) => {
    const con = 'This is best content ever.';
    const params = {}; // changing titile & content in 'index.pug'
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}; // changing titile & content in 'index.pug'
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send('Data has been saved to the DataBase');
    }).catch(() => {
        res.status(400).send("Data was not saved to the DataBase");
    });
    // res.status(200).render('contact.pug');
});

// Activate SERVER
app.listen(port, () => {
    console.log(`the app started succesfully on ${port}`);
});