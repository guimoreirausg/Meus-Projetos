
//DOM to get elements from HTML
const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    
    addDigit(digit) {
        //check if already has dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    processOperation(operation) {
        //check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //change operation
            if(previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }
    

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, previous, current)
                break;
            case "DEL":
                this.processDelOperation()
                break;
            case "C":
                this.processCleanAll()
                break;
            case "CE":
                this.processCleanCurrent()
                break;
            case "=":
                this.processEqual()
                break;
            default:
                return;
            
        }
    }

    updateScreen(operationValue = null, operation = null, previous= null, current = null) {
        console.log (operationValue, previous , operation, current);
       
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous === 0) {
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }

    }

    changeOperation(operation) {
        const mathOperation = ["*", "+", "-", "/"]

        if (!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
    //delete last number
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    //clean all
    processCleanAll() {
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = ""    
    }
    // clean current operation
    processCleanCurrent() {
        this.currentOperationText.innerText = ""
    }

    processEqual(){
        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }   
}

const calc = new Calculator (previousOperationText, currentOperationText)

//difference between numbers and operation
buttons.forEach ((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >=0 || value === "."){
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }

    });
});

