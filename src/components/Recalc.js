import React from 'react';
import RecalcButton from './RecalcButton';
import RecalcDisplay from './RecalcDisplay';
import styles from './Recalc.module.css';


class Recalc extends React.Component {
  MAX_INPUT_DIGITS = 16;
  OPERATIONS = {
    '+': (a,b) => { return a + b },
    '-': (a,b) => { return a - b },
    '*': (a,b) => { return a * b },
    '/': (a,b) => { return a / b }
  };
  DEBUG_STATE = false;

  constructor() {
    super();

    this.state = {
      displayValue: "0",
      operandValue: '',
      secondValue: '',
      waitingOperand: false,
      operator: null,
      expressionEnd: false
    }
  }

  render() {
    const { 
      className,
      displayValue,
      operandValue,
      secondValue,
      operator,
      expressionEnd 
    } = this.state;
    const componentClass = styles.root 
      + (className ? ' ' + className : '');
    const operation = operandValue
      + (operator ? ' ' + operator : '')
      + (secondValue ? ' ' + secondValue : '')
      + (expressionEnd ? ' =' : '');

    return (
      <div className={componentClass}>
        {
          this.DEBUG_STATE ?
            <div className={styles.debug}>
              {JSON.stringify(this.state, null, 2)}
            </div> : null
        }
        <RecalcDisplay
          displayValue={displayValue}
          operation={operation}>
        </RecalcDisplay>
        <div className={styles.calcBtnPad}>
          <div className={styles.clearBtns}>
            <RecalcButton
              className={styles.calcBtn + ' ' + styles.clearingBtn}
              inputFunc={this.clear}>C</RecalcButton>
            <RecalcButton
              className={styles.calcBtn + ' ' + styles.clearingBtn}
              inputFunc={this.clearEntry}>CE</RecalcButton>
            <RecalcButton
              className={styles.calcBtn + ' ' + styles.clearingBtn}
              inputFunc={this.backspace}>BACK</RecalcButton>
          </div>
          <div className={styles.numpad}>
            <RecalcButton
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='7'>7</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='8'>8</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='9'>9</RecalcButton>
            <RecalcButton
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='4'>4</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='5'>5</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='6'>6</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='1'>1</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='2'>2</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='3'>3</RecalcButton>
            <RecalcButton
              className={styles.calcBtn}
              inputFunc={this.toggleSign}>+/-</RecalcButton>
            <RecalcButton 
              className={styles.calcBtn}
              inputFunc={this.inputDigit}
              inputVal='0'>0</RecalcButton>
            <RecalcButton
              className={styles.calcBtn}
              inputFunc={this.inputDecimal}>.</RecalcButton>
          </div>
          <div className={styles.opBtns}>
            <RecalcButton
              className={styles.operatorBtn + ' ' + styles.calcBtn}
              inputFunc={this.inputOperator}
              inputVal='/'>/</RecalcButton>
            <RecalcButton
              className={styles.operatorBtn + ' ' + styles.calcBtn}
              inputFunc={this.inputOperator}
              inputVal='*'>*</RecalcButton>
            <RecalcButton
              className={styles.operatorBtn + ' ' + styles.calcBtn}
              inputFunc={this.inputOperator}
              inputVal='-'>-</RecalcButton>
            <RecalcButton
              className={styles.operatorBtn + ' ' + styles.calcBtn}
              inputFunc={this.inputOperator}
              inputVal='+'>+</RecalcButton>
            <RecalcButton
              className={styles.operatorBtn + ' ' + styles.calcBtn}
              inputFunc={this.inputEqual}>=</RecalcButton>
          </div>
        </div>
      </div>
    );
  }

  inputDigit = (digit) => {
    const { displayValue, waitingOperand, expressionEnd } = this.state;
    const displayLength = displayValue.length;
    const hasDecimal = displayValue.indexOf('.') !== -1;
    const maxLength = this.MAX_INPUT_DIGITS + hasDecimal;

    if (expressionEnd) {
      this.clear();
      this.setState({ displayValue: digit });
    } else if (waitingOperand) {
      this.setState({
        waitingOperand: false, 
        displayValue: digit
      });
    } else if (displayLength < maxLength) {
      const newValue = displayValue === '0' ? digit : displayValue + digit;
      this.setState({ displayValue: newValue });
    }
  }

  inputDecimal = () => {
    const { displayValue, waitingOperand, expressionEnd} = this.state;
    const displayLength = displayValue.length;
    const noDecimal = displayValue.indexOf('.') === -1;
    
    if (waitingOperand) {
      this.setState({
        waitingOperand: false,
        displayValue: '0.'
      });
    } else if (expressionEnd) {
      this.clear();
      this.setState({ displayValue: '0.' });
    } else if (noDecimal && displayLength < this.MAX_INPUT_DIGITS) {
      const newValue = displayValue + '.';
      this.setState({ displayValue: newValue });
    }
  }

  inputOperator = (operator) => {
    const { displayValue, operandValue, waitingOperand, expressionEnd } = this.state;

    if (operandValue === '') {
      this.setState({
        operandValue: displayValue
      });
    } else if (expressionEnd) {
      this.setState({
        operandValue: displayValue,
        secondValue: ''
      });
    } else if (!waitingOperand) {
      const result = this.calculate(operandValue, displayValue);
      this.setState({
        displayValue: result,
        operandValue: result
      });
    }

    this.setState({ 
      operator: operator, 
      waitingOperand: true, 
      expressionEnd: false 
    });
  }

  inputEqual = () => {
    const { displayValue, operandValue, secondValue, operator } = this.state;

    if (!operator) {
      this.setState({ 
        operandValue: displayValue
      });
    } else if (secondValue === '') {
      const result = this.calculate(operandValue, displayValue);
      this.setState({
        displayValue: result,
        secondValue: displayValue,
      })
    } else {
      const result = this.calculate(displayValue, secondValue);
      this.setState({
        displayValue: result,
        operandValue: displayValue
      });
    }

    this.setState({ expressionEnd: true, waitingOperand: false });
  }

  toggleSign = () => {
    const { displayValue } = this.state;

    this.setState({
      displayValue: (-1 * parseFloat(displayValue)).toString(),
      waitingOperand: false,
    });
  }

  calculate = (a=1, b=1) => {
    const { operator } = this.state;

    return this.OPERATIONS[operator](
      parseFloat(a), 
      parseFloat(b)
    ).toString();    
  }

  backspace = () => {
    const { displayValue, waitingOperand, expressionEnd } = this.state;
    const displayLength = displayValue.length;
    if (waitingOperand || expressionEnd) {
      return
    }

    if (displayLength > 1) {
      this.setState({ 
        displayValue: displayValue.slice(0, displayLength - 1)
      });
    } else {
      this.setState({ displayValue: '0' });
    }
  }

  clear = () => {
    this.setState({
      displayValue: '0',
      operandValue: '',
      secondValue: '',
      waitingOperand: false,
      operator: '',
      expressionEnd: false,
    });
  }

  clearEntry = () => {
    if (this.state.expressionEnd) {
      this.clear();
    } else {
      this.setState({
        displayValue: '0'
      });
    }
  }
}

export default Recalc;