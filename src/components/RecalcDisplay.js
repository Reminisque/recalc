import React from 'react';
import ScalingText from './ScalingText';
import styles from './RecalcDisplay.module.css';

class RecalcDisplay extends React.Component {
  render() {
    const { displayValue, operation } = this.props;
    
    return (
      <div className={styles.root}>
        <ScalingText className={styles.operationText}>{operation}</ScalingText>
        <ScalingText className={styles.currentText}>{displayValue}</ScalingText>
      </div>
    );
  }
}

export default RecalcDisplay;