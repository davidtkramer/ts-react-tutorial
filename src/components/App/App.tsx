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

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface Props {}

interface State {
  todos: Todo[];
}

class App extends Component<Props, State> {
  state: State = {
    todos: [
      { id: 1, text: 'My first todo', isCompleted: false },
      { id: 2, text: 'My second todo', isCompleted: true },
      { id: 3, text: 'My third todo', isCompleted: false },
      { id: 4, text: 'My fourth todo', isCompleted: true }
    ]
  }

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
            {this.state.todos.map((todo) =>
              <ListItem key={todo.id}>
                <ListItemIcon>
                  <Checkbox edge='start' checked={todo.isCompleted} />
                </ListItemIcon>
                <ListItemText>{todo.text}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge='end'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    );
  }
}

export default App;
