const btnGrid = document.querySelector('#number-grid');
let ReferenceValue = 9;

for (let i = 0; i < 3; i++) {
    if (ReferenceValue >= 3) {
        for (let j = ReferenceValue - 2; j <= ReferenceValue; j++ ) {
            const btn = document.createElement('button');
            btnGrid.appendChild(btn);
            btn.textContent = j;
        }
        ReferenceValue -= 3;
        if (ReferenceValue < 3) {
            const zero = document.createElement('button');
            btnGrid.appendChild(zero);
            zero.textContent = ReferenceValue;
        }

    }
}