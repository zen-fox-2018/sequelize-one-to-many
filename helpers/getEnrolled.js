

function getEnrolled(dataStudent) {
    if(dataStudent.StudentSubject.score) {
        return dataStudent.StudentSubject.score
    } else {
       return  `<a href="/subjects/${dataStudent.StudentSubject.id}/give-score">Give Score</a>`
    }
}

module.exports = getEnrolled