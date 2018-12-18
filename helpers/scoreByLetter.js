function scoreByLetter(score) {
  if (score > 85) {
    return 'A';
  } else if (score > 70) {
    return 'B';
  } else if (score > 55) {
    return 'C';
  } else if (score <= 55) {
    return 'E';
  } else if  (score === null) {
    return 'Empty';
  }
}

module.exports = scoreByLetter;