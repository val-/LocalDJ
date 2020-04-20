import * as React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, PanResponder, Animated, StatusBar } from 'react-native';

import { play, pause, setTrackNext, setTrackPrev } from '../actions/player';
import { remove } from '../actions/tracklist';

import PlaybackIcon from './PlaybackIcon';
import NextIcon from './NextIcon';
import PrevIcon from './PrevIcon';
import TrashIcon from './TrashIcon';
import Fade from './Fade';

const SLIDER_RANGE_MAX = 210;
const SLIDER_RANGE_MIN = 180;
const SLIDER_RANGE_HOME = 10;
const SLIDER_DURATION = 300;

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSliderNearHome: true,
            isSliderTouched: false
        };
    }

    handleSwitchPlayback = () => {
        if (this.props.isActive) {
            this.props.pause();
        } else {
            this.props.play();
        }
    };

    handleSwitchPrev = () => {
        this.props.setTrackPrev();
        this.props.play();
    };

    handleSwitchNext = () => {
        this.props.setTrackNext();
        this.props.play();
    };

    handleRemove = () => {
        this.props.remove(this.props.track, this.handleSwitchNext);
    };

    sliderPan = new Animated.Value(0);

    sliderPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.sliderPan.setOffset(this.sliderPan._value);
        this.sliderPan.addListener(this.sliderPanListener);
        this.setState({ isSliderTouched: false });
      },
      onPanResponderMove: Animated.event([
        null,
        { dy: this.sliderPan }
      ]),
      onPanResponderRelease: () => {
        Animated.timing(this.sliderPan, {
            toValue: 0,
            duration: SLIDER_DURATION
        }).start(() => {
            this.setState({ isSliderNearHome: true });
        });
        if (!this.state.isSliderTouched) {
            this.handleSwitchPlayback();
        } else if (
            this.sliderPan._value > SLIDER_RANGE_MIN ||
            this.sliderPan._value < -SLIDER_RANGE_MIN
        ) {
            this.handleRemove();
        }
        this.sliderPan.removeAllListeners();
      }
    });

    sliderPanListener = ({ value }) => {
        this.setState({ isSliderNearHome: Math.abs(value) < SLIDER_RANGE_HOME });
        if (!this.state.isSliderNearHome) {
            this.setState({ isSliderTouched: true });
        }
        if (value > SLIDER_RANGE_MAX) {
            this.sliderPan.setValue(SLIDER_RANGE_MAX);
        }
        if (value < -SLIDER_RANGE_MAX) {
            this.sliderPan.setValue(-SLIDER_RANGE_MAX);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <View style={styles.row}>
                    <Fade visible={!this.state.isSliderNearHome}>
                        <TrashIcon/>
                    </Fade>
                </View>
                <View style={styles.row}>
                    <Fade visible={this.state.isSliderNearHome}>
                        <TouchableOpacity onPress={this.handleSwitchPrev}>
                            <PrevIcon />
                        </TouchableOpacity>
                    </Fade>
                    <Animated.View
                        style={{ transform: [{ translateY: this.sliderPan }] }}
                        {...this.sliderPanResponder.panHandlers}
                    >
                        <PlaybackIcon isActive={this.props.isActive} isEmpty={!this.state.isSliderNearHome}/>
                    </Animated.View>
                    <Fade visible={this.state.isSliderNearHome}>
                        <TouchableOpacity onPress={this.handleSwitchNext}>
                            <NextIcon />
                        </TouchableOpacity>
                    </Fade>
                </View>
                <View style={styles.row}>
                    <Fade visible={!this.state.isSliderNearHome}>
                        <TrashIcon/>
                    </Fade>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

const mapStateToProps = state => ({
    isActive: state.player.isActive,
    track: state.player.track.present,
});

const mapDispatchToProps = {
    play,
    pause,
    setTrackNext,
    setTrackPrev,
    remove,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainScreen);
