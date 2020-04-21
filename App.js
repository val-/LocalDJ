import * as React from 'react';
import { connect } from 'react-redux';

import HomeScreen from './components/HomeScreen';
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
    return <HomeScreen/>;
  }

}

const mapDispatchToProps = {
  rescanFiles,
  setTrackNext,
};

export default connect(false, mapDispatchToProps)(App);
