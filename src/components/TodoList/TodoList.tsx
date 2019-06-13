import React, { Component } from 'react';
import List from '@material-ui/core/List';

import { Todo } from '../../models/Todo';
import TodoItem from '../TodoItem/TodoItem';

export interface Props {
  todos: Todo[];
  filterType: number;
  toggleTodo(todoId: number): void;
  deleteTodo(todoId: number): void;
}

enum FilterTypes {
  ALL = 0,
  COMPLETED = 1,
  PENDING = 2
};

export default class TodoList extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.todos !== nextProps.todos
      || this.props.filterType !== nextProps.filterType;
  }

  filterTodos() {
    const { todos, filterType } = this.props;
    if (filterType === FilterTypes.COMPLETED) {
      return todos.filter((todo) => todo.isCompleted);
    } else if (filterType === FilterTypes.PENDING) {
      return todos.filter((todo) => !todo.isCompleted);
    } else {
      return todos;
    }
  }

  render() {
    console.log('rendering TodoList');
    return (
      <List>
        {this.filterTodos().map((todo) =>
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
