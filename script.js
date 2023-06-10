const numberGrid = document.querySelector('#number-grid');
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
    displayInput(event.target.id, event.target.parentNode.id);
})

function displayInput(buttonId, gridName) {
    const visor = document.querySelector('#display');
    if(buttonId != " = "  && gridName != 'middle-buttons' && gridName != 'top-buttons'){
        visor.textContent += buttonId;
    }
}