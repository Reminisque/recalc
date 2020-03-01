import React from 'react';
import ScalingText from './ScalingText';
import styles from './RecalcDisplay.module.css';

class RecalcDisplay extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <ScalingText className={styles.currentText}>{this.props.children}</ScalingText>
      </div>
    );
  }
}

export default RecalcDisplay;