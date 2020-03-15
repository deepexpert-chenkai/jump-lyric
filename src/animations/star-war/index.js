import React from 'react';

export default class StarWar extends React.Component {
  constructor() {
    super();

    this.state = {
      showTextList: []
    }
  }

  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    const { lines, time } = this.props;

    

    return (
      <div>
        888
      </div>
    )
  }
}