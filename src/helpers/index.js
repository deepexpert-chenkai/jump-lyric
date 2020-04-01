export const getBodyFontSize = () => {
  const body = document.querySelector('body');
  const fontSize = window.getComputedStyle( body,null).getPropertyValue('font-size')
  return parseFloat(fontSize);
}

export const generateRamdon = (limit, expect) => {
  const ramdon = Math.floor(Math.random()*limit);
  if(ramdon === expect) {
    return generateRamdon(limit, expect);
  }
  return ramdon;
}