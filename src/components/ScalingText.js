import React from 'react';
import styles from './ScalingText.module.css';

class ScalingText extends React.Component {
  constructor() {
    super();

    this.state = {
      scale: 1
    };

    this.container = React.createRef();
  }

  render() {
    const { className } = this.props;
    const componentClass = styles.root
      + (className ? ' ' + className : '');
    
    return (
      <div 
        className={componentClass}
        ref={this.container}
        style={{ transform: `scale(${this.state.scale})` }}>
        {this.props.children}
      </div>
    )
  }

  componentDidUpdate() {
    const scale = this.state.scale;
    const node = this.container.current;
    const parent = node.parentNode;
    const usedWidth = node.offsetWidth;
    const maxWidth = parent.offsetWidth;

    const contentScale = maxWidth / usedWidth;
    
    if (contentScale === scale) {
      return
    }

    if (contentScale < 1) {
      this.setState({ scale: contentScale });
    } else if (scale < 1) {
      this.setState({ scale: 1 });
    }
  }
}

export default ScalingText