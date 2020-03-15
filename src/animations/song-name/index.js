import React from 'react';

export default class SongName extends React.Component {

  render() {
    const {  lines } = this.props;
    return (
      <div>
        { lines[0] ? line[0].txt : 'Untitled'}
      </div>
    )
  }
}