function _getRandom(min=0, max=255) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function getHexColor() {
  const arr = [
    _getRandom().toString(16).padStart(2, '0'),
    _getRandom().toString(16).padStart(2, '0'),
    _getRandom().toString(16).padStart(2, '0'),
  ]
  return `#${arr.join('')}`
}

function pixelToNumber(pixel) {
  return parseInt(pixel.replace('px', ''))
}

function getCompareSmall(a, b) {
  return a > b ? b : a
}

function getCompareBig(a, b) {
  return a > b ? a : b
}