
export const sinShake = (time, range=30, angle=0, cycleTime = 500) => {
  return Math.sin(time/cycleTime)* range;
}

export const todo = () => {};