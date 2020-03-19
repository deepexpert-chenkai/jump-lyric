import React from 'react';

export default class StarWar extends React.Component {
  constructor() {
    super();

    this.state = {
      showTextList: []
    }
  }

  getStyle = (passTime) => {
    const disappearTime = 5000;
    return {
      top: -(passTime/disappearTime)*300,
      opacity: 1- (passTime/disappearTime),
    }
  }

  render() {
    const { lines, time } = this.props;

    

    return (
      <div className="star-war">
        <For each='line' of={lines} index="idx">
          <If condition={line.time <= time}>
            <div className="star-war__line" key={idx} style={this.getStyle(time-line.time)}>
              {line.txt}
            </div>
          </If>
        </For>
      </div>
    )
  }
}