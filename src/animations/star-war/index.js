import React from 'react';
import { getBodyFontSize } from '~helpers/index';

export default class StarWar extends React.Component {
  constructor() {
    super();

    this.fontSize = getBodyFontSize();
    this.state = {
      showTextList: []
    }
  }

  getStyle = (passTime) => {
    const disappearTime = 6000;
    return {
      top: -(passTime/disappearTime)*300,
      opacity: 1- (passTime/disappearTime),
      transform: `scale(${(1- (passTime/disappearTime)*0.3)}`,
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