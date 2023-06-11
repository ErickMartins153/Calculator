const numberGrid = document.querySelector('#number-grid');
const visor = document.querySelector('#display');
let ReferenceValue = 9;
let index = 0;
let insertedValues = [];
let numberJoined = [];
let operations = []
let operatorDetected = false;

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
    if (!isButton){
        return;
    }
    checkInput(event.target.id, event.target.parentNode.id);
})

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
        for (let i = 0; i < operations.length; i++) {
            displayInput(operator);
            if (operations[i] == " + ") {
                joinNumber(insertedValues);
                sum();
            }
            if (operations[i] == " - ") {
                joinNumber(insertedValues);
                subtract();
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
    let result = 0;
    for (let i = 0; i < numberJoined.length; i++) {
        result += numberJoined[i];
    }
    displayInput(result);
}

function subtract() {
    displayInput(numberJoined.reduce((total, currentValue) => total - currentValue));
}

//check using a for if the element is in operations array, if it is, jump
//that way get just the numbers and realize the right operation with it