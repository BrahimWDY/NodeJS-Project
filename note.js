var readline = require('readline');
const mongoose = require('mongoose');
var fs = require('fs');
const chalk = require('chalk');
const prompt = chalk.bold.cyan;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
// key=topic value=question
const questions = {
    name: 'Quel est le nom du client ? : ',
    note: 'Ecrivez votre note : ',
    secondnote: 'Y a t il une autre note à insérer(O / N) ? : ',
    ifyes: 'Si Oui: Ecrivez votre second note : '
};

let answers = {
    name: '  ',
    note: '  ',
    secondnote: '   ',
    ifyes: '  '
};

const ask = function(topic, rl){
    return new Promise(function(resolve, reject){
        rl.question(prompt(questions[topic]), function(answer){
            answers[topic] = answer
            resolve();
        });
    })
};

const makeNote = function(answers){

    let note = {
        noteName: answers.name,
        clientNote : answers.note,
        secondNote : answers.ifyes
    }
    return note
};

const exportNoteFolder = function(note){
    let foldername = answers.name
    let path = './notes/' + foldername
    fs.mkdir(path, function(error){
        if(error){
            console.log(error);
        }
        else{
            console.log('repository created');
        }
    });

};

const exportNoteFile = function(note){
    
    let filename = 'notes' + '.' + answers.name
    let foldername = answers.name
    let path = 'notes/' + foldername + '/'  + filename

    fs.writeFile(path, JSON.stringify(note), 'utf8', function(err) {
        if (err) throw err;
        console.log('note completed');
    });
};

const main = async function(){
    for (let topic in questions) {
        await ask(topic, rl)
    }
    console.log('finished, ', answers)
    rl.close()

    let note = makeNote(answers)
    exportNoteFolder(note)
    exportNoteFile(note)
    
};

main()
