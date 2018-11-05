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
      users: null
    }

    this.getUsers = this.getUsers.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount(){
    //Call our fetch function below once the component mounts
    try{
      console.log('componentDidMount - getting Data');
      const users = await this.getUsers();
      this.setState({ users });
    }
    catch(e){
      throw Error(e);
    }
  }

  async getUsers(){
    console.log('getUsers')
    const response = await fetch('/api/users'); 
    const body = await response.json();
    console.log('users response', body)
    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  }

  handleClick(githubId){
    console.log('handleClick passed id back up', githubId);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
      {this.state.users &&
        <EnhancedTable data = {this.state.users} handleClick = {this.handleClick}/>
      }
      { !this.state.users && <CircularProgress className={classes.progress} />}
      </div>
    );
  }
}

export default withStyles(styles)(App);
