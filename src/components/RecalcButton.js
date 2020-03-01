import React from 'react';
import styles from './RecalcButton.module.css';

class RecalcButton extends React.Component {
  render() {
    const { digit } = this.props;
    return (
      <button className={styles.root} onClick={() => this.inputDigit(digit)}>
        {this.props.children}
      </button>
    );
  }

  inputDigit = (d) => this.props.inputDigit(d);
}

export default RecalcButton;