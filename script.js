const numberGrid = document.querySelector('#number-grid');
const visor = document.querySelector('#display');
let ReferenceValue = 9;
let insertedValues = [];
let index = 0;
let numberJoined = [];

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
    if(buttonId != " = "  && gridName != 'middle-buttons' && gridName != 'top-buttons'){
            if (isNaN(parseInt(buttonId)) && isNaN(parseInt(lastCharacter))) {
                return;
            }
        displayInput(buttonId);
        storeInput(buttonId, gridName);
    }
    if (buttonId == " = ") {
        joinNumber(insertedValues);
    }
}

function displayInput(buttonId) {
        visor.textContent += buttonId;
}

function storeInput(button, grid) {  
    if (grid == 'number-grid') {
        insertedValues.push(button);
    } else{
    insertedValues.push(button);
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
        } else {
            getOperation(element);
        }
    });
    numberJoined[index] = result;
    index++;
    console.log(numberJoined);
}