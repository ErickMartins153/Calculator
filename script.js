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
    if(gridName == 'operator-grid') {
        if (isNaN(parseInt(buttonId)) && isNaN(parseInt(lastCharacter))) {
            return;
        }
        if(insertedValues.length == 0){
            return;
        }
        storeInput(buttonId, gridName)
        joinNumber(insertedValues)
    }
    if(buttonId != " = "  && gridName == 'number-grid'){
        storeInput(buttonId, gridName);
    }
    displayInput(buttonId)
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
    numberJoined[index] = result;
    index++;
    insertedValues = [];
    console.log(numberJoined)
}

function getOperation(operator) {
    let result = 0;
    if (operator == " = " && operatorDetected == true){
        
    }
    if (operator != " = ") {
        operations[index] = operator;
        operatorDetected = true;
    }
    console.log(operations);
}