const questions = [
    "Quel est le nom du client ? ",
    "Écrivez votre note: ",
    "Avez vous une autre note à insérer ? (O/N)",

];

const answers = [];

const ask = (index) => {

    // ecrire un process qui permet d'afficher les question
    process.stdout.write(`\n${questions[index]}\n`);

}


// on récupère les reponses et on les met dans un tableau

process.stdin.on('data', (data) => {
    answers.push(data);
    // on fait une conditon si on arrive au bout des questions on exit
    if (questions.length === answers.length){

        process.exit();
    }
    ask(answers.length);
});

process.on('exit', () => {
    // const ans = answers.charAt(2);
     console.log(answers[2].charAt(0));

    // if (ans == "O") {
    //     ask(1);
    // }
});

// taxe
// process.on('exit', () => {
//     const taxe = answers[0] * answers[1] /100;
//
//     console.log(taxe);
// });



ask(0);

// var sentence = 'The quick brown fox jumps over the lazy dog.';
//
// var index = 10;
//
// console.log('The character at index ' + index + ' is ' + sentence.charAt(index));





