import React from 'react';

const sinShake = (time, range=100, angle=0, cycleTime = 800) => {
  return Math.sin(time/cycleTime)* range;
}