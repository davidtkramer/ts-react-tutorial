import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './App.css';

interface Props {}

class App extends Component<Props> {
  render() {
    return (
      <Grid container justify='center'>
        <Paper className='todo-list-container'>
          <TextField
            id='outlined-bare'
            placeholder='Write a todo...'
            variant='outlined'
            fullWidth
          />
          <List>
            <ListItem>
              <ListItemIcon>
                <Checkbox edge='start'/>
              </ListItemIcon>
              <ListItemText>This is a todo</ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge='end'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    );
  }
}

export default App;
