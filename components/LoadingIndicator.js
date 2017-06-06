import React from 'react';
import '../node_modules/loaders.css/src/animations/line-scale-pulse-out-rapid.scss';
import '../styles/loading-indicator-animations.scss';
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let loader = '';
    let style = {
      height: this.props.size + 'rem',
      width: this.props.size * 0.15 + 'rem',
      backgroundColor: this.props.color || 'black'
    }
    if (this.props.show) {
      loader = (
                <div
                  className={'line-scale-pulse-out-rapid'}>
                  <div style={style}></div>
                  <div style={style}></div>
                  <div style={style}></div>
                  <div style={style}></div>
                  <div style={style}></div>
                </div>
      );
    } else {
      loader = <span></span>
    }
    return loader;

  }
}

Loader.defaultProps = {
  show: true,
  size: '5'
}

