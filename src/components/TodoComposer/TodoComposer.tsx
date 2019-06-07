import React, { Component, KeyboardEvent } from 'react';
import TextField from '@material-ui/core/TextField';

export interface Props {
  draft: string;
  changeDraft(draft: string): void;
  createTodo(event: KeyboardEvent<HTMLDivElement>): void;
}

export default class TodoComposer extends Component<Props> {
  render() {
    const { draft, changeDraft, createTodo } = this.props;
    return (
      <TextField
        id='outlined-bare'
        placeholder='Write a todo...'
        variant='outlined'
        fullWidth
        value={draft}
        onChange={(event) => changeDraft(event.target.value)}
        onKeyPress={createTodo}
      />
    );
  }
}
