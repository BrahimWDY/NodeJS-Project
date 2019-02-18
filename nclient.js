const invoiceModel = require ('./models/sales.model');
var readline = require('readline');
const mongoose = require('mongoose');
var fs = require('fs');
const chalk = require('chalk');
const prompt = chalk.bold.cyan;
mongoose.connect('mongodb://brahim:admin123@ds153974.mlab.com:53974/project-nodejs', { useNewUrlParser : true }, (error) => {
    if (error) {
        console.log('DataBase not connected!');
    }
    else {
        console.log('DataBase connected!');
    }
});

//Constante globale Readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// key=topic value=question
const questions = {
    name: 'Quel est le nom du client ? : ',
    prestation: 'Quel est la prestation fournie ? : ',
    invoicedHour: 'Combien d’heure facturée? : ',
    costPerHour: 'Quel est le coût horaire ? : ',
    taxed: 'Y a t il une TVA à appliquer(O / N) ? : ',
    taxe: 'Si Oui: Quel est le taux de TVA (5/20) ? : '
};

// Déclaration variable answer
let answers = {
    name: '',
    prestation: '',
    invoicedHour: '',
    costPerHour: '',
    taxed: '',
    tax: ''
};

//Fonction Promise Asynchrone
const ask = function(topic, rl){
    return new Promise(function(resolve, reject){
        rl.question(prompt(questions[topic]), function(answer){
            answers[topic] = answer
            resolve()
        });
    })
};

//Fonction Générateur de Facture
const makeInvoice = function(answers){
    let client = _getClientFromDb(answers.name)
    let costWithoutTax = answers.costPerHour * answers.invoicedHour
    let totalCost = costWithoutTax + answers.tax
    let creationDate = new Date().toISOString().slice(0,10)
    let invoiceNumber = _getInvoiceNumber()

    let invoice = {
        invoiceNumber: invoiceNumber,
        firstName: client.firstName,
        lastName: client.lastName,
        adress: client.adress,
        postalCode: client.postalCode,
        city: client.city,
        creationDate: creationDate,
        prestation: answers.prestation,
        invoicedHour: answers.invoicedHour,
        costPerHour: answers.costPerHour,
        taxed: answers.taxed,
        costWithoutTax: costWithoutTax,
        tax: answers.tax,
        totalCost: totalCost,
    }
    return invoice
};

function _getInvoiceNumber() {
    return 'F0001'
    // let client = 
    // return client
};

function _getClientFromDb(name) {
    return {}
    // let client = 
    // return client
};

//Création de dossier
const exportInvoiceFolder = function(invoice){
    let foldername = answers.name
    let path = './invoices/' + foldername
    fs.mkdir(path, function(error){
        if(error){
            console.log(error);
        }
        else{
            console.log('repository created');
        }
    });

};
//Fonction exporter la facture
const exportInvoiceFile = function(invoice){
    
    let filename = invoice.invoiceNumber
    let foldername = answers.name
    let path = 'invoices/' + foldername + '/'  + filename

    fs.writeFile(path, JSON.stringify(invoice), 'utf8', function(err) {
        if (err) throw err;
        console.log('export complete');
    });
};

//Fonction mettre la facture dans la BD
const insertToDb = function(invoice){ 
    let invoiceDb =  new invoiceModel ({
        InvoiceId: invoice.invoiceNumber,
        TotalCost: invoice.totalCost
    });

    invoiceDb.save(function(err){
        if (err) {
            console.log(err);
        }
        console.log('Invoice wrote to db');
    })
};

//Fonction générateur de fichier log
const logInvoice = function(invoice){
    // log

};

//Fonction asynchrone
const main = async function(){
    for (let topic in questions) {
        await ask(topic, rl)
    }
    console.log('finished, ', answers)
    rl.close()

    let invoice = makeInvoice(answers)
    exportInvoiceFolder(invoice)
    exportInvoiceFile(invoice)
    insertToDb(invoice)
    // logInvoice(invoice)
};

main()
