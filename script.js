const numberGrid = document.querySelector('#number-grid');
const visor = document.querySelector('#display');
let ReferenceValue = 9;

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
    }
}

function displayInput(buttonId) {
        visor.textContent += buttonId;
}