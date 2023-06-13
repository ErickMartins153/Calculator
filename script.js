const numberGrid = document.querySelector('#number-grid');
const visor = document.querySelector('#display');
const AC = document.querySelector('#AC');
const OFF = document.querySelector('#OFF');
const sound = document.querySelector('#sound');
const audio = new Audio("/src/calculator-sound.mp3");
audio.volume = 0.05;
let isSoundOn = true;
let ReferenceValue = 9;
let index = 0;
let insertedValues = [];
let numberJoined = [];
let operations = [];
let operatorDetected = false;
let isOnline = true;

for (let i = 0; i < 3; i++) {
    if (ReferenceValue >= 3) {
        for (let j = ReferenceValue - 2; j <= ReferenceValue; j++ ) {
            const btn = document.createElement('button');
            numberGrid.appendChild(btn);
            btn.textContent = j;
            btn.setAttribute('id', j);
        }
        ReferenceValue -= 3;
        if (ReferenceValue < 3) {
            const zero = document.createElement('button');
            numberGrid.appendChild(zero);
            zero.textContent = ReferenceValue;
            zero.setAttribute('id', '0');
            zero.classList.add('big-buttons');
        }
    }
}

const buttonGrid = document.querySelector('.button-grid');

buttonGrid.addEventListener('click', event => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton || isOnline == false){
        return;
    }
    if (isSoundOn == true) {
        audio.currentTime = 0;
        audio.play();
    }
    checkInput(event.target.id, event.target.parentNode.id);
});

AC.addEventListener('click', clearAll);

OFF.addEventListener('click', event => {
    if (isOnline == true) {
        clearAll();
        OFF.textContent = 'ON';
        isOnline = false;
    } else {
        OFF.textContent = 'OFF';
        isOnline = true;
    }
});

sound.addEventListener('click', function() {
    if (isSoundOn == true) {
        isSoundOn = false;
    } else {
        isSoundOn = true;
    }
});

function clearAll() {
        index = 0;
        insertedValues = [];
        numberJoined = [];
        operations = [];
        operatorDetected = false;
        visor.textContent = '';
}

function checkInput(buttonId, gridName) {
    let lastCharacter = visor.textContent.slice(-1);
    if (gridName == 'middle-buttons' || gridName == 'top-buttons') {
        return;
    }
    if (gridName == 'operator-grid') {
        if (isNaN(parseInt(buttonId)) && isNaN(parseInt(lastCharacter))) {
            return;
        }
        if(insertedValues.length == 0){
            return;
        }
         storeInput(buttonId, gridName);
         joinNumber(insertedValues);
    }
    if(buttonId != " = "  && gridName == 'number-grid'){
        storeInput(buttonId, gridName);
    }
    buttonId == " = " ? 0:displayInput(buttonId);
    
}

function displayInput(buttonId) {
        visor.textContent += buttonId;
}

function storeInput(button, grid) {  
    if (grid == 'number-grid') {
        insertedValues.push(button);
    } else {
        getOperation(button);
    }
}

function joinNumber(array) {
    let result = '';
    if (insertedValues.length == 0) {
        insertedValues.push(0);
    }
    array.map(element => {
        if (!isNaN(parseInt(element))) {
            result += element.toString();
        }
    });
    numberJoined[index] = parseInt(result);
    index++;
    insertedValues = [];
}

function getOperation(operator) {
    if (operator == " = " && operatorDetected == true){
        joinNumber(insertedValues);
        for (let i = 0; i < operations.length; i++) {
            displayInput(operator);
            if (operations[i] == " + ") {
                sum();
            }
            if (operations[i] == " - ") {
                subtract();
            }
            if (operations[i] == " x ") {
                multiplication();
            }
        }
    }
    if (operator != " = ") {
        operatorDetected = true;
    }
    operations[index] = operator;
    console.log(operations);
}

function sum() {
    displayInput(numberJoined.reduce((total, currentValue) => total + currentValue));
}

function subtract() {
    displayInput(numberJoined.reduce((total, currentValue) => total - currentValue));
}

function multiplication() {
    displayInput(numberJoined.reduce((total, currentValue) => total * currentValue), 1);
}

//check using a for if the element is in operations array, if it is, jump
//that way get just the numbers and realize the right operation with it