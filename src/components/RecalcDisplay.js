import React from 'react';
import ScalingText from './ScalingText';
import styles from './RecalcDisplay.module.css';

class RecalcDisplay extends React.Component {
  render() {
    const { className, displayValue, operation } = this.props;
    const componentClass = styles.root
      + (className ? ' ' + className : '');
    
    return (
      <div className={componentClass}>
        <ScalingText className={styles.operationText}>{operation}</ScalingText>
        <ScalingText className={styles.currentText}>{displayValue}</ScalingText>
      </div>
    );
  }
}

export default RecalcDisplay;