// on récupère express
const express = require ('express');

// on récupère mongoose

const mongoose = require ('mongoose');

const bodyParser = require ('body-parser');

const fs = require('fs');

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// on se connecte a la base de donnée

mongoose.connect('mongodb://brahim:admin123@ds153974.mlab.com:53974/project-nodejs', { useNewUrlParser : true }, (error) => {
    if (error) {
        console.log('DataBase not connected!');
    }
    else {
        console.log('DataBase connected!');
    }
})



app.get('/', (req,res) => {
    res.send('Accueil');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server on on port ${port}`);
})