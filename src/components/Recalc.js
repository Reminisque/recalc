import React from 'react';
import RecalcButton from './RecalcButton';
import RecalcDisplay from './RecalcDisplay';
import styles from './Recalc.module.css';


class Recalc extends React.Component {
  MAX_INPUT_DIGITS = 16;
  OPERATORS = {
    '+': "Add",
    '-': "Subtract",
    '*': "Multiply",
    '/': "Divide"
  };

  constructor() {
    super();

    this.state = {
      displayValue: '0',
      operandValue: '0',
      waitingOperand: false,
      operator: null
    }
  }

  render() {
    const operation = this.state.operandValue + 
      (this.state.operator ? ' ' + this.state.operator : '');

    return (
      <div className={styles.root}>
        <RecalcDisplay
          displayValue={this.state.displayValue}
          operation={operation}>
        </RecalcDisplay>
        {
          Array.from(Array(10)).map((_, num) => 
            <RecalcButton 
              key={num} 
              inputFunc={this.inputDigit}
              inputVal={`${num}`}>{num}</RecalcButton>
          )
        }
        <RecalcButton
          inputFunc={this.inputOperator}
          inputVal='+'>+</RecalcButton>
      </div>
    );
  }

  inputDigit = (digit) => {
    const { displayValue } = this.state;

    if (this.state.waitingOperand) {
      this.setState({
        waitingOperand: false, 
        operandValue: displayValue,
        displayValue: digit
      });
    } else if (this.state.displayValue.length < this.MAX_INPUT_DIGITS) {
      const newValue = displayValue === '0' ? digit : displayValue + digit;
      this.setState({ displayValue: newValue });
    }
  }

  inputOperator = (operator) => {
    this.setState({ waitingOperand: true, operator: operator });
  }

  calculate = () => {
    console.log("Calculate not implemented yet");
  }
}

export default Recalc;