function scoreLetter (score) {
  if (score == null) {
    return 'Empty Score'
  } else if(score > 85) {
    return 'A'
  } else if (score > 70) {
    return 'B'
  } else if (score > 55) {
    return 'C'
  } else if (score > 45) {
    return 'D'
  } else {
    return 'E'
  }
}



module.exports = scoreLetter;