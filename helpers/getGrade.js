
function getGrade(nilai) {
    if(nilai == null) return 'empty'
    else if(nilai > 85) return 'A'
    else if(nilai > 70) return 'B'
    else if(nilai > 55) return 'C'
    else if(nilai <= 55) return 'E'
}

module.exports = getGrade