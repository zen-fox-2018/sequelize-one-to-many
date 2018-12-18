function convertGrade(value){
  if (value >85) {
    return 'A';
  }
  else if (value > 70) {
    return 'B';
  }
  else if (value > 55) {
    return 'C';
  }
  else if (value <= 55) {
    return 'E';
  }
  else {
    return 'empty';
  }
}

module.exports = convertGrade;
