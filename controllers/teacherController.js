const Model = require('../models')

class TeacherController {
  static allData(req, res) {
    Model.Teacher.findAll()
    .then( allTeacher => {
      let data = allTeacher.map( a => a.dataValues)
      console.log(data);
      res.render('teacher.ejs' , { data })
    })
    .catch( err=> {
      res.send(err)
    })
  }

  static addTeacher(req, res) {
    Model.Teacher.create()
    .then( created => {
      res.render('/teacher.ejs')
    })
    .catch( err=> {
      res.send(err)
    })
  }

  static menu(req, res) {
    if (req.body.edit) {
      
    } else if (req.body.delete) {
      
    }
  }
}


module.exports = TeacherController