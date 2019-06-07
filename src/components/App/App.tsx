import React, { Component, ChangeEvent } from 'react';
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
  id: number;
  draft: string;
  todos: Todo[];
}

class App extends Component<Props, State> {
  state: State = {
    id: 4,
    draft: '',
    todos: [
      { id: 1, text: 'My first todo', isCompleted: false },
      { id: 2, text: 'My second todo', isCompleted: true },
      { id: 3, text: 'My third todo', isCompleted: false },
      { id: 4, text: 'My fourth todo', isCompleted: true }
    ]
  }

  changeDraft(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const draft = event.target.value;
    this.setState((state) => ({ ...state, draft }));  // foo
  }

  createTodo(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && this.state.draft !== '') {
      this.setState((state) => ({
        id: state.id + 1,
        draft: '',
        todos: [ ...state.todos, { id: state.id + 1, text: state.draft, isCompleted: false }]
      }));
    }
  }

  toggleTodo(todoId: number) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todoId === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    }));
  }

  deleteTodo(todoId: number) {
    this.setState((state) => ({
      ...state,
      todos: state.todos.filter((todo) => todoId !== todo.id)
    }));
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
            value={this.state.draft}
            onChange={(event) => this.changeDraft(event)}
            onKeyPress={(event) => this.createTodo(event)}
          />
          <List>
            {this.state.todos.map((todo) =>
              <ListItem key={todo.id}>
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    checked={todo.isCompleted}
                    onChange={() => this.toggleTodo(todo.id)}
                  />
                </ListItemIcon>
                <ListItemText>{todo.text}</ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge='end' onClick={() => this.deleteTodo(todo.id)}>
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
