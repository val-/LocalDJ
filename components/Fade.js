import * as React from 'react';
import { Animated } from 'react-native';

export default class Fade extends React.Component {

    constructor({ visible }) {
        super();
        this.state = {
            viewOpacity: new Animated.Value(visible ? 1 : 0)
        };
    }

    componentDidUpdate({ oldVisible }) {
        const { visible } = this.props;
        if (visible !== oldVisible) {
            const newTargetValue = visible ? 1 : 0;            
            Animated.timing(
                this.state.viewOpacity,
                {
                  toValue: newTargetValue,
                  duration: 200,
                },
            ).start();
        }
    }
    
      render() {
        const { viewOpacity } = this.state;
        return (
          <Animated.View style={{ opacity: viewOpacity }}>
            {this.props.children}
          </Animated.View>
        );
      }
}
