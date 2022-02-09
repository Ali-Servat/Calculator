const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const history = document.querySelector('[data-history]');
const mainDisplay = document.querySelector('[data-main-display]');

let operation;
let displayNumber = [];
let historyNumber = null;
let typePeriod = true;
mainDisplay.innerHTML = '0';

//NUMBERS EVENT LISTENER

numberBtns.forEach(number=>{
    number.addEventListener('click',(e)=>{
        displayNumber.push(number.innerHTML);
        mainDisplay.innerHTML = displayNumber.join('');
        if(e.target.innerHTML === '.'){
            if(typePeriod === false){
                displayNumber.pop(number.innerHTML);
                mainDisplay.innerHTML = displayNumber.join('');
            } 
            typePeriod = false;
        }
    })
})

//OPERATORS EVENT LISTENER

operationBtns.forEach(button=>{
    button.addEventListener('click',(e)=>{
        mainDisplay.innerHTML = '';
        displayNumber = displayNumber.join('');
        displayNumber = Number(displayNumber);
        operation = e.target.innerHTML;
        if(historyNumber === null){
            historyNumber = displayNumber;
            history.innerHTML = historyNumber + ' ' + operation;
            displayNumber = [];
        } else {
        historyNumber = operate(e.target.innerHTML);
        displayNumber = [];
        history.innerHTML = historyNumber + ' ' + operation;
        }
        equalsBtn.disabled = false;
        typePeriod = true;
    })
})

//EVALUATION BUTTON EVENT LISTENER

equalsBtn.addEventListener('click',()=>{
    history.innerHTML = '';
    displayNumber = displayNumber.join('');
    displayNumber = Number(displayNumber);
    historyNumber = operate(operation);
    mainDisplay.innerHTML = historyNumber;
    displayNumber = mainDisplay.innerHTML.split('');
    historyNumber = null;
    equalsBtn.disabled = true;
    typePeriod = true;
})

//DELETE BUTTON EVENT LISTENER

deleteBtn.addEventListener('click',()=>{
    let displayText = mainDisplay.innerHTML.split('');
    displayText.pop();
    displayNumber = displayText;
    displayText = displayText.join('');
    mainDisplay.innerHTML = displayText;
})

//ALL CLEAR BUTTON EVENT LISTENER

allClearBtn.addEventListener('click',()=>{
    historyNumber = null;
    displayNumber = [];
    mainDisplay.innerHTML = '0';
})


//FUNCTIONS

function operate(key){
    switch(key){
            case '+':
                historyNumber = historyNumber + displayNumber;
                return historyNumber;
            case '-':
                historyNumber = historyNumber - displayNumber;
                return historyNumber;
            case '*':
                historyNumber = historyNumber * displayNumber;
                return historyNumber;
            case '/':
                historyNumber = historyNumber / displayNumber;
                return historyNumber;
        }
}
