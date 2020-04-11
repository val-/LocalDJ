import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import PlaybackIcon from './components/PlaybackIcon';
import NextIcon from './components/NextIcon';
import PrevIcon from './components/PrevIcon';
import TrashIcon from './components/TrashIcon';

import { play, pause, setTrackNext, setTrackPrev } from './actions/player';
import { rescanFiles, remove } from './actions/tracklist';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.rescanFiles(this.props.setTrackNext);
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
          <View style={styles.row}>
            <TouchableOpacity onPress={this.handleRemove}>
              <TrashIcon/>
            </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.handleSwitchPrev}>
            <PrevIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleSwitchPlayback}>
            <PlaybackIcon isActive={this.props.isActive} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleSwitchNext}>
            <NextIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.row}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  isActive: state.player.isActive,
  track: state.player.track.present,
});

const mapDispatchToProps = {
  play,
  pause,
  rescanFiles,
  setTrackNext,
  setTrackPrev,
  remove,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
