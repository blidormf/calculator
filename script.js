let a = '';
let b = '';
let operator = '';

const display = document.querySelector('#display');
const digits = document.querySelectorAll('#digit');
const operators = document.querySelectorAll('#operator');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const equalsButton = document.querySelector('#equals');

digits.forEach(digit => {
    digit.addEventListener('click', e => {
        const numString = e.target.textContent;

        if (operator === '') {
            if (numString === '.' && a.includes('.'))
                return;
            a += numString;
        } else {
            if (numString === '.' && b.includes('.'))
                return;
            b += numString;
        }

        displayExpression();
    });
});

operators.forEach(op => {
    op.addEventListener('click', e => {
        const operatorString = e.target.textContent;

        if (b === '') {
            operator = operatorString;
            displayExpression();
        } else {
            a = operate(a, operator, b) + '';
            operator = operatorString;
            b = '';
            displayExpression();
        }
    });
});

clearButton.addEventListener('click', () => {
    a = operator = b = result = '';
    displayExpression();
});

deleteButton.addEventListener('click', () => {
    if (b !== '') {
        b = b.slice(0, -1);
    } else if (operator !== '') {
        operator = '';
    } else if (a !== '') {
        a = a.slice(0, -1);
    }

    displayExpression();
});

equalsButton.addEventListener('click', () => {
    if (b === '') {
        displayExpression();
    } else {
        a = operate(a, operator, b) + '';
        operator = b = '';
        displayExpression();
    }
})

function operate(a, operator, b) {
    a = +a;
    b = +b;

    switch (operator) {
        case '+':
            return Math.round((a + b) * 100) / 100;
        case '-':
            return Math.round((a - b) * 100) / 100;
        case '×':
            return Math.round((a * b) * 100) / 100;
        case '÷':
            if (b === 0)
                return 'Can\'t divide by 0';
            return Math.round((a / b) * 100) / 100;
        case '%':
            return Math.round((a % b) * 100) / 100;
    }
}

function displayExpression() {
    display.textContent = a + operator + b;
}