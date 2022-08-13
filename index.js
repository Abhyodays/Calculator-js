class Calculator{
  constructor(preOperandTextElement,curOperandTextElement){
    this.preOperandTextElement = preOperandTextElement;
    this.curOperandTextElement = curOperandTextElement;
    this.clear();
  }

  clear(){
    this.curOperand = '';
    this.preOperand = '';
    this.operation = undefined;
  }
  delete(){

  }
  compute(){
    let result ;
    const cur = parseFloat(this.curOperand);
    const pre = parseFloat(this.preOperand);
    if(isNaN(cur)||isNaN(pre)) return;
    switch(this.operation){
      case '+':
        result = pre+cur;
        break;
      case '-':
        result = pre-cur;
        break;
      case '*':
        result = pre*cur;
        break;
      case '÷':
        result = pre/cur;
        break;
      default:
        return ;
    }
    this.curOperand = result;
    this.operation = undefined;
    this.preOperand = '';
  }
  appendNumber(curNumber){
    if(curNumber==='.' && this.curOperand.includes('.')) return;
    this.curOperand = this.curOperand.toString()+curNumber.toString();
  }
  chooseOperation(operation){
    if(this.curOperand==='') return;
    if(this.preOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.preOperand = this.curOperand;
    this.curOperand ='';
  }
  updateDisplay(){
    this.curOperandTextElement.innerText = this.curOperand;
    if(this.operation !==undefined)
      this.preOperandTextElement.innerText = `${this.preOperand}${this.operation}`;
    else
      this.preOperandTextElement.innerText = this.preOperand;
  }
  getDisplayNumber(num){
    const strNum = num.toString();
    const intDigits = parseFloat(strNum.split('.')[0]);
    const decimalDigits = strNum.split('.')[1];
    let intDisplay;
    if(isNaN(intDisplay)){
      intDisplay = '';
    }
    else{
      intDisplay = intDigits.toLocaleString('en',{
        maximumFractionDigits:0
      })
    }
    if(decimalDigits != NULL){
      return `${intDisplay}.${decimalDigits}`;
    }
    return intDisplay
  }
}

const operators = document.querySelectorAll('[data-operation]');
const oprands = document.querySelectorAll('[data-oprand]');
const equalBtn = document.querySelector('[data-equals]');
const delBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');

const preOperandTextElement = document.querySelector('[data-prev-operand]');
const curOperandTextElement = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(preOperandTextElement,curOperandTextElement);
oprands.forEach(button =>
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay()
  })
)
operators.forEach(button =>
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
)
equalBtn.addEventListener('click',()=>{
  calculator.compute();
  calculator.updateDisplay();
})
delBtn.addEventListener('click',()=>{
  calculator.curOperand = calculator.curOperand.toString().slice(0,-1);
  calculator.updateDisplay();
})

allClearBtn.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})
