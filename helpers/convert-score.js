
function convertScore(numScore){
  // - Score > 85, A
  // - Score > 70, B
  // - Score > 55, C
  // - Score <= 55, E
  // - Tidak ada score, empty
  if(numScore>85){
    return "A"
  } 
  else if(numScore > 70){
    return "B"
  } 
  else if(numScore > 55){
    return "C"
  }
  else{
    return "E"
  }
}

module.exports = convertScore