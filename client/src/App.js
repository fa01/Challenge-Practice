import React, { Component } from 'react';
import './App.css';
import EnhancedTable from './components/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: null,
      addData: false,
      email: '',
      phone: null,
      wrongData: false
    }

    this.getUsers = this.getUsers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
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
    this.setState({addData: true})
  }

  handleNameChange(event){
    console.log('handleNameChange', event.target.value)
    this.setState({
      phone: event.target.value,
    });
  }

  handleEmailChange(event){
    console.log('handlePhoneChange', event.target.value)
    this.setState({
      email: event.target.value,
    });
  }

  handleSubmit(event){
    console.log('handleSubmit');
    event.preventDefault();

    console.log('submitting to API', );
    if(!this.state.phone.match(/\d/g).length === 10){
      this.setState({ wrongData: true});
    }

    if(!this.state.email.includes('@')){
      this.setState({ wrongData: true});
    }
 
  }

  render() {
    const { classes } = this.props;
    console.log('this.state', this.state);
    return (
      <div className="App">
      {this.state.users && !this.state.addData &&
        <EnhancedTable data = {this.state.users} handleClick = {this.handleClick}/>
      }
      {this.state.addData &&
      <div>
        {this.state.wrongData && 
          <div>
            Submission does not have correct data format. Phone number must be 10 digit number. Email must be a string with @
          </div>
        }
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="standard-name"
          label="Phone Number"
          className={classes.textField}
          value={this.state.phone}
          onChange={(event) => {this.handleNameChange(event)}}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={(event) => {this.handleEmailChange(event)}}
          margin="normal"
          type = {'email'}
        />
        <Button variant='contained' className={classes.button} type='submit' >
          Add Info
        </Button>
      </form>
      </div>
      }
      { !this.state.users && <CircularProgress className={classes.progress} />}
      </div>
    );
  }
}

export default withStyles(styles)(App);
