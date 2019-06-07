import React, { Component } from 'react';
import List from '@material-ui/core/List';

import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../models/Todo';

export interface Props {
  todos: Todo[];
  toggleTodo(todoId: number): void;
  deleteTodo(todoId: number): void;
}

export default class TodoList extends Component<Props> {
  render() {
    return (
      <List>
        {this.props.todos.map((todo) =>
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={this.props.toggleTodo}
            deleteTodo={this.props.deleteTodo}
          />
        )}
      </List>
    );
  }
}
