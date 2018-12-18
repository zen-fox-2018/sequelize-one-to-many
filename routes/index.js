const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    let info = req.query.info
    let err = req.query.err
    res.render('home', {info: info , err: err})
})


module.exports = router