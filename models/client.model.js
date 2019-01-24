// On appelle mongoose
const mongoose = require ('mongoose');

// On fait un schema qui nous permet de mapper la base de donnée
const Schema = mongoose.Schema;

let clientSchema =  new Schema ({
    NomClient: string,
    Adresse: String,
    CP: number,
    Ville: string,
    ContactRefId: Number,
    Telephone: number,
    Mail: string,
    Prospect: Boolean
});

// On crée une classe qu'on va utiliser ailleurs
module.exports =  mongoose.model('client', clientSchema);