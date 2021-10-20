class Calculator {

    /*конструктор*/
    constructor(previousOperandTextElement, currentOperandTextElement) { 
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();        
    }

    /*функция для полной очистки окна вывода*/ 
    clear() {         
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    /*функция для удаления последней цифры
    путем преобразования в строку и отсечения последнего символа*/
    delete() {        
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    
    /*определяет нажатую цифру, добавляет ее на экран, 
    обновляет значение currentOperand*/ 
    appendNumber(number) {    
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    /*обновляет операцию, текущее и предыдущее значение 
    проверяет, есть ли текущее и предыдущее занчение,
    нужно ли посчитать перед добавлением новой операции*/
    chooseOperation(operation) {      
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    /*функция подсчитывает результат для целых чисел и выдает результат
    1.проверяет являются ли входные значения числами
    2.выполняет действие в зависимости от операции
    3. помещает результат в currentOperand*/
    compute() {      
        let computation;
        const prev = parseInt(this.previousOperand);
        const current = parseInt(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
    
    /*функция для вывода на экран*/
    updateDisplay() {    
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation == null) {
            this.previousOperandTextElement.innerText = '';
        }
    }
  }

const numberButtons = document.querySelectorAll('[data-number]') //получаем список кнопок с номерами
const operationButtons = document.querySelectorAll('[data-operation]')//получаем список кнопок с операциями
const equalsButton = document.getElementById("data-equals")//получаем "="
const deleteButton = document.querySelector('[data-delete]')//получаем delete
const allClearButton = document.querySelector('[data-all-clear]')//получаем АС
const previousOperandTextElement = document.querySelector('[data-previous-operand]')//получаем предыдущий операнд
const currentOperandTextElement = document.querySelector('[data-current-operand]')//и текущий операнд
  
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);//загрузка данных из калькулятора
  
/*для каждой кнопки с цифрой добавляем EventListener,
псоле клика вызываем appendNumber и обновляем дисплей*/ 
numberButtons.forEach(button => {                   
    button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    });
});

/*аналогично numberButtons*/ 
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    });
});

/*Добаляем для "=" EventListener,
При нажатии на кнопку, считается результат и обновляется экран*/
equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

/*Добаляем для "АС" EventListener,
При нажатии на кнопку, все данные стираются и обновляется экран*/
allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

/*Добаляем для "DEL" EventListener,
При нажатии на кнопку, удаляется последняя цифра и обновляется экран*/
deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});