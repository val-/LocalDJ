import * as React from 'react';
import { connect } from 'react-redux';

import MainScreen from './components/MainScreen';

import { setTrackNext } from './actions/player';
import { rescanFiles } from './actions/tracklist';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.rescanFiles(this.props.setTrackNext);
  }

  render() {
    return <MainScreen/>;
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  rescanFiles,
  setTrackNext,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
