import React, { Component } from 'react';
import { Circle } from 'react-google-maps';
import raf from 'raf';

export default class CircleMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: 300,
    }
  }

  isUnmounted = false;

  componentDidMount = () => {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius + 5, 0) });

      if (this.state.radius < 300) {
        raf(tick);
      } else {
        this.setState({
          radius: 10,
        })
        raf(tick);
      }
    };
    raf(tick);
  }
  
  componentDidUpdate = (prevProps) => {
    if (prevProps.center !== this.props.center) {
      const tick = () => {
        if (this.isUnmounted) return;
        this.setState({ 
          radius: Math.max(this.state.radius - 20, 0) 
        });

        if (this.state.radius > 10) {
          raf(tick);
        }
      };
      raf(tick);
    }
  }
  
  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render = () => {
    return (
      <Circle 
        {...this.props}
        radius={this.props.isHovered ? this.state.radius * 3 : this.state.radius}
        options={{
          fillOpactiy: 1,
          fillColor: this.props.labelColor,
          fillOpacity: 1,
          strokeColor: this.props.labelColor,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
      />
    );
  }
}
