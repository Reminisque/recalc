import React from 'react';
import RecalcButton from './RecalcButton';
import RecalcDisplay from './RecalcDisplay';
import styles from './Recalc.module.css';


class Recalc extends React.Component {
  MAX_INPUT_DIGITS = 16;

  constructor() {
    super();

    this.state = {
      displayValue: '0',
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <RecalcDisplay>{this.state.displayValue}</RecalcDisplay>
        {
          Array.from(Array(10)).map((_, num) => 
            <RecalcButton 
              key={num} 
              inputDigit={this.inputDigit}
              digit={num}>{num}</RecalcButton>
          )
        }
      </div>
    );
  }

  inputDigit = (digit) => {
    if (this.state.displayValue.length < this.MAX_INPUT_DIGITS) {
      const newValue = this.state.displayValue + digit;
      this.setState({ displayValue: newValue });
    }
  }
}

export default Recalc;