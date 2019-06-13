import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export interface Props {
  filterType: number;
  changeFilter(filterType: number): void;
}

export default class TodoTabs extends Component<Props> {
  render() {
    return (
      <Tabs
        indicatorColor='primary'
        textColor='primary'
        centered
        value={this.props.filterType}
        onChange={(_, tabIndex) => this.props.changeFilter(tabIndex)}
        style={{ marginBottom: 10 }}
      >
        <Tab label='All' />
        <Tab label='Completed' />
        <Tab label='Pending' />
      </Tabs>
    );
  }
}
