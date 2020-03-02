import React from 'react';
import styles from './RecalcButton.module.css';

class RecalcButton extends React.Component {
  render() {
    const { inputVal } = this.props;
    return (
      <button className={styles.root} onClick={() => this.inputFunc(inputVal)}>
        {this.props.children}
      </button>
    );
  }

  inputFunc = (val) => this.props.inputFunc(val)
  
  
}

export default RecalcButton;