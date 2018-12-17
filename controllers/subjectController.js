const Model = require('../models')

class SubjectController {
  static allData(req, res) {
    Model.Subject.findAll()
      .then( allSubject => {
        console.log(allSubject)
        let data = []
        allSubject.forEach( a => {
          a.dataValues.subject = []
          Model.Teacher.findAll( { where: { subjectId : a.dataValues.id } } )
        })

      })
  }
}

module.exports = SubjectController