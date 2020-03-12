import React from 'react';
import styles from './RecalcButton.module.css';

class RecalcButton extends React.Component {
  render() {
    const { className, inputVal } = this.props;
    const componentClass = styles.root
      + (className ? ' ' + className : '');

    return (
      <button className={componentClass} onClick={() => this.inputFunc(inputVal)}>
        {this.props.children}
      </button>
    );
  }

  inputFunc = (val) => this.props.inputFunc(val)
}

export default RecalcButton;