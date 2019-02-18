const mongoose = require ('mongoose');

// On fait un schema qui nous permet de mapper la base de donnée
const Schema = mongoose.Schema;

let salesSchema =  new Schema ({
    InvoiceId: String,
    TotalCost: Number
});

module.exports = mongoose.model('sales', salesSchema)
