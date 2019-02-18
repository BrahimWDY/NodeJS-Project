// on récupère express
const express = require ('express');

// on récupère mongoose

const mongoose = require('mongoose');
const clientController = require('./controllers/client.controller');


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

// Route

app.post('/api/v1/client', clientController.createClient)
app.get('/api/v1/client', clientController.getClient)
app.get('/api/v1/client/:id', clientController.getClientById)
app.put('/api/v1/client/:id', clientController.UpdateClient)
app.delete('/api/v1/client/:id', clientController.removeClient)
app.post('/api/v1/client/deletemany', clientController.removeMany)







const port = 3000;

app.listen(port, () => {
    console.log(`Server on on port ${port}`);
})