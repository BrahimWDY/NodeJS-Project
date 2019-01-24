// On appelle mongoose
const mongoose = require ('mongoose');

// On fait un schema qui nous permet de mapper la base de donnée
const Schema = mongoose.Schema;

let refSchema =  new Schema ({
    IdRef: number,
    Nom: String,
    Prenom: string,
    Poste: number
});

// On crée une classe qu'on va utiliser ailleurs
module.exports =  mongoose.model('referent', refSchema);