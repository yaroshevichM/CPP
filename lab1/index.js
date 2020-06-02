const readlineSync = require('readline-sync');

start();

function start() {

    const computerNumber = generateRandomNumber(0, 9, 4);
    console.log(computerNumber);
    guessComputerNumber(computerNumber);

}


function guessComputerNumber(guessNumber) {

    while (true) {

        let userNumber = readlineSync.question("Your number:");

        if (checkNumbers(guessNumber, userNumber)) {
            break;
        }
    }

    return true;
}

function checkNumbers(pcNum, uNum) {

    pcNumStr = pcNum.toString();
    uNumStr = uNum.toString();


    if (pcNumStr.includes(uNumStr)) {

        process.stdout.write(`You win!`);
        return true

    } else {

        let bulls = 0;
        let cows = 0;

        for (let pcNumChar = 0; pcNumChar < pcNumStr.length; pcNumChar++) {

            for (let uNumChar = 0; uNumChar < uNumStr.length; uNumChar++) {

                if (pcNumChar === uNumChar && pcNumStr[pcNumChar] === uNumStr[uNumChar]) {
                    bulls++;
                } else if (pcNumChar !== uNumChar && pcNumStr[pcNumChar] === uNumStr[uNumChar]) {
                    cows++;
                }
            }
        }

        process.stdout.write(`Cows: ${cows}, Bulls: ${bulls} \n`);
        return false

    }

}


function generateRandomNumber(min = 0, max = 9, countDigits) {
    let digitsArray = [];

    while (digitsArray.length < countDigits) {
        let digit = randomInteger(min, max);

        if (!digitsArray.includes(digit)) {
            digitsArray.push(digit);
        }

        if (digitsArray[0] === 0) {
            digitsArray = [];
        }
    }

    let randomNum = +digitsArray.join('');
    return randomNum;
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}