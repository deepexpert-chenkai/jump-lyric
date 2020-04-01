import React from 'react';
import { sinShake } from '../base';

export default class SongName extends React.Component {

  render() {
    const { time, lines } = this.props;
    const top = sinShake(time);
    return (
      <div className="song-name">
        <div className="song-name__text" style={{top: top+'px'}}>
          { lines[0] ? lines[0].txt : 'Untitled'}
        </div>
      </div>
    )
  }
}