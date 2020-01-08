import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import PlaybackIcon from './components/PlaybackIcon';
import NextIcon from './components/NextIcon';
import PrevIcon from './components/PrevIcon';

import {play, pause} from './actions/player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActive: true};
  }

  handleSwitch = () => {
    if (this.props.isActive) {
      this.props.pause();
    } else {
      this.props.play();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <PrevIcon />
          <TouchableOpacity onPress={this.handleSwitch}>
            <PlaybackIcon isActive={this.props.isActive} />
          </TouchableOpacity>
          <NextIcon />
        </View>
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
});

const mapDispatchToProps = dispatch => {
  return {
    play: () => {
      dispatch(play());
    },
    pause: () => {
      dispatch(pause());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
