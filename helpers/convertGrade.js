function convertGrade(number){
    let grade = ''
    if(number >=0 && number <= 55){
        grade = 'E'
    }
    else if ( number < 70){
        grade = 'C'
    }
    else if (number < 85){
        grade = 'B'
    }
    else if (number <= 100){
        grade = 'A'
    }
    return grade
}

module.exports = convertGrade