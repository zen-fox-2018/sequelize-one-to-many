
function scoreByLetter (score) {
  if (score == null) {
    return 'No Entry'
  } else if(score > 85) {
    return 'A'
  } else if (score > 70) {
    return 'B'
  } else if (score > 55) {
    return 'C'
  } else if (score <= 55) {
    return 'D'
  }
}



module.exports = scoreByLetter;