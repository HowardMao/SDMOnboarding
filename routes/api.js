const express = require('express');
const router = express.Router();
const Grades = require('../models/grades');

//Uses the 'Grades' model from '../models/grades.js' to find all students with student_id: 0, and only exposes class_id field
router.get('/grades', (req, res, next) => {
    Grades.find({student_id: 0}).then((data) => res.json(data)).catch(next);
});

//I have no clue wtf this does cause I haven't tested it out yet
router.post('/grades', (req, res, next) => {
    if(req.body.action){
        Grades.create(req.body).then((data) => res.json(data).catch(next));
    }
    else{
        res.json({error: 'The input field is empty'})
    }
});

module.exports = router;