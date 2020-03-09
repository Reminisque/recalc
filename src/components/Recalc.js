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
    const operation = this.state.operandValue + 
      (this.state.operator ? ' ' + this.state.operator : '') + 
      (this.state.secondValue ? ' ' + this.state.secondValue : '') +
      (this.state.expressionEnd ? ' =' : '');

    return (
      <div className={styles.root}>
        {
          this.DEBUG_STATE ?
            <div className={styles.debug}>
              {JSON.stringify(this.state, null, 2)}
            </div> : null
        }
        <RecalcDisplay
          displayValue={this.state.displayValue}
          operation={operation}>
        </RecalcDisplay>

        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='7'>7</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='8'>8</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='9'>9</RecalcButton>
        <RecalcButton
          inputFunc={this.inputOperator}
          inputVal='/'>/</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='4'>4</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='5'>5</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='6'>6</RecalcButton>
        <RecalcButton
          inputFunc={this.inputOperator}
          inputVal='*'>*</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='1'>1</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='2'>2</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='3'>3</RecalcButton>
        <RecalcButton
          inputFunc={this.inputOperator}
          inputVal='-'>-</RecalcButton>
        <RecalcButton
          inputFunc={this.clear}>C</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputDigit}
          inputVal='0'>0</RecalcButton>
        <RecalcButton 
          inputFunc={this.inputEqual}>=</RecalcButton>
        <RecalcButton
          inputFunc={this.inputOperator}
          inputVal='+'>+</RecalcButton>
        <RecalcButton
          inputFunc={this.toggleSign}>+/-</RecalcButton>
      </div>
    );
  }

  inputDigit = (digit) => {
    const { displayValue } = this.state;

    if (this.state.waitingOperand) {
      this.setState({
        waitingOperand: false, 
        displayValue: digit
      });
    } else if (this.state.expressionEnd) {
      this.clear();
      this.setState({ displayValue: digit });
    } else if (this.state.displayValue.length < this.MAX_INPUT_DIGITS) {
      const newValue = displayValue === '0' ? digit : displayValue + digit;
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

  calculate = (a=1, b=1) => {
    const { operator } = this.state;

    return this.OPERATIONS[operator](
      parseFloat(a), 
      parseFloat(b)
    ).toString();    
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

  toggleSign = () => {
    const { displayValue } = this.state;

    this.setState({
      displayValue: (-1 * parseFloat(displayValue)).toString(),
      waitingOperand: false
    });
  }
}

export default Recalc;