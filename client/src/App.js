import React, { Component } from 'react';
import './App.css';
import EnhancedTable from './components/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: null
    }

  }

  async componentDidMount(){
    //Call our fetch function below once the component mounts
    try{
      console.log('componentDidMount - getting Data');
    }
    catch(e){
      throw Error(e);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
      {this.state.data &&
        <EnhancedTable data = {this.state.data} />
      }
      { !this.state.data && <CircularProgress className={classes.progress} />}
      </div>
    );
  }
}

export default withStyles(styles)(App);
