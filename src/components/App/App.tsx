import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    id: 4,
    draft: '',
    todos: [
      { id: 1, text: 'My first todo', isCompleted: false },
      { id: 2, text: 'My second todo', isCompleted: true },
      { id: 3, text: 'My third todo', isCompleted: false },
      { id: 4, text: 'My fourth todo', isCompleted: true }
    ]
  }

  changeDraft = (draft: string) => {
    this.setState(() => ({ draft }));
  }

  createTodo = () => {
    this.setState((state) => ({
      id: state.id + 1,
      draft: '',
      todos: [ ...state.todos, { id: state.id + 1, text: state.draft, isCompleted: false }]
    }));
  }

  toggleTodo = (todoId: number) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) =>
        todoId === todo.id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    }));
  }

  deleteTodo = (todoId: number) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todoId !== todo.id)
    }));
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
