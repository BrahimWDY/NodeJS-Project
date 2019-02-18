const Client = require ('../models/client.model');
const fs = require('fs');


// créer un client

exports.createClient = (req, res) => {

    let client =  new Client ({
        NomClient: req.body.NomClient,
        Adresse: req.body.Adresse,
        CP: req.body.CP,
        ContactRef: {
            nom : req.body.ContactRef.nom,
            prenom : req.body.ContactRef.prenom,
            poste : req.body.ContactRef.poste
        },
        Telephone: req.body.Telephone,
        Mail: req.body.Mail,
        Prospect: req.body.Prospect
    });
    client.save((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Client ajouté !');
            //console.log(client);
        }
        res.send(client);
    })

}


// afficher tout les clients

exports.getClient = (req, res) => {
    Client.find((err, client) => {
        if (err){
            console.log(err);
        }
        res.send(client);
    })
}

// Afficher le détails d'un client

exports.getClientById = (req, res) => {
    Client.findById(req.params.id, (err, client) => {
        if (err){
            console.log(err);
        }
        res.send(client);
    })
}


// Modifier client

exports.UpdateClient = (req, res) => {

    Client.findByIdAndUpdate(req.params.id, req.body, (err, client) => {
        if (err){
            console.log(err);
        }
        else{
            console.log("Client mis à jour !");
        }
        res.send(client);

    })
}


// Supprimer un client

exports.removeClient = (req, res) => {
    Client.findByIdAndRemove(req.params.id, req.body, (err, client) => {
        if (err){
            console.log(err);
        }
        else{
            console.log("Client supprimé !");
        }
        res.send(client);

    })
}

// Supprimer plusieurs clients

exports.removeMany = (req, res) => {
    Client.deleteMany(req.body, (err, client) => {
        if (err){
            console.log(err);
        }
        else{
            console.log("Clients supprimés !");
        }
        res.send(client);

    })
}
