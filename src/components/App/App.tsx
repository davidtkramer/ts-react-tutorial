import React, { Component, KeyboardEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import localforage from 'localforage'

import TodoComposer from '../TodoComposer/TodoComposer';
import TodoList from '../TodoList/TodoList';
import { Todo } from '../../models/Todo';

import './App.css';

interface Props {}

interface State {
  id: number;
  draft: string;
  todos: Todo[];
}

class App extends Component<Props, State> {
  state: State = {
    id: 0,
    draft: '',
    todos: []
  }

  componentDidMount() {
    localforage.getItem<State>('todos-state').then((state) => {
      this.setState(() => state);
    });
  }

  persistState = () => {
    localforage.setItem('todos-state', this.state);
  }

  changeDraft = (draft: string) => {
    this.setState(() => ({ draft }), this.persistState);
  }

  createTodo = () => {
    this.setState((state) => ({
      id: state.id + 1,
      draft: '',
      todos: [ ...state.todos, { id: state.id + 1, text: state.draft, isCompleted: false }]
    }), this.persistState);
  }

  toggleTodo = (todoId: number) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) =>
        todoId === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    }), this.persistState);
  }

  deleteTodo = (todoId: number) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todoId !== todo.id)
    }), this.persistState);
  }

  render() {
    return (
      <Grid container justify='center'>
        <Paper className='todo-list-container'>
          <TodoComposer
            draft={this.state.draft}
            changeDraft={this.changeDraft}
            createTodo={this.createTodo}
          />
          <TodoList
            todos={this.state.todos}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
          />
        </Paper>
      </Grid>
    );
  }
}

export default App;
