import React, { Component, KeyboardEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import localforage from 'localforage';

import { Todo } from '../../models/Todo';
import TodoList from '../TodoList/TodoList';
import TodoComposer from '../TodoComposer/TodoComposer';
import TodoTabs from '../TodoTabs/TodoTabs';

import './App.css';

interface Props {}

interface State {
  id: number;
  todos: Todo[];
  draft: string;
  filterType: number;
}

class App extends Component<Props, State> {
  state: State = {
    id: 0,
    draft: '',
    todos: [],
    filterType: 0
  };

  componentDidMount() {
    this.loadState();
  }

  async loadState() {
    const state = await localforage.getItem('todos-state');
    this.setState(() => state);
  }

  persistState() {
    localforage.setItem('todos-state', this.state);
  }

  changeDraft = (newDraft: string) => {
    this.setState(() => {
      return { draft: newDraft };
    }, this.persistState);
  }

  createTodo = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && this.state.draft !== '') {
      this.setState((prevState) => ({
        id: prevState.id + 1,
        draft: '',
        todos: [
          ...prevState.todos,
          { id: prevState.id + 1, text: prevState.draft, isCompleted: false }
        ]
      }), this.persistState);
    }
  }

  toggleTodo = (todoId: number) => {
    this.setState((prevState) => {
      const todos = prevState.todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
      return { todos: todos };
    }, this.persistState);
  }

  deleteTodo = (todoId: number) => {
    this.setState((prevState) => {
      const todos = prevState.todos.filter((todo) => {
        return todo.id !== todoId;
      });
      return { todos };
    }, this.persistState);
  }

  changeFilter = (filterType: number) => {
    this.setState(() => ({ filterType }), this.persistState);
  }

  render() {
    return (
      <Grid container justify='center'>
        <Paper className='todo-list-container'>
          <TodoTabs
            filterType={this.state.filterType}
            changeFilter={this.changeFilter}
          />
          <TodoComposer
            draft={this.state.draft}
            changeDraft={this.changeDraft}
            createTodo={this.createTodo}
          />
          <TodoList
            todos={this.state.todos}
            toggleTodo={this.toggleTodo}
            deleteTodo={this.deleteTodo}
            filterType={this.state.filterType}
          />
        </Paper>
      </Grid>
    );
  }
}

export default App;