// On appelle mongoose
const mongoose = require ('mongoose');

// On fait un schema qui nous permet de mapper la base de donnée
const Schema = mongoose.Schema;

let clientSchema =  new Schema ({
    NomClient: String,
    Adresse: String,
    CP: Number,
    Ville: String,
    ContactRef: {
        nom : String,
        prenom : String,
        poste: String
    },
    Telephone: {type: String, match: /\d{10}/},
    Mail: String,
    Prospect: Boolean
})

// On crée une classe qu'on va utiliser ailleurs
module.exports =  mongoose.model('client', clientSchema);
