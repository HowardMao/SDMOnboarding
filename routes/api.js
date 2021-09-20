const express = require('express');
const router = express.Router();
const Goals = require('../models/goals');

//Uses the 'Goals' model from '../models/goals.js' to find all goals
router.get('/goals', (req, res, next) => {
    Goals.find({}).then((data) => res.json(data)).catch(next);
});

//I have no clue wtf this does cause I haven't tested it out yet
router.post('/goals', (req, res, next) => {
    if(req.body.action){
        Goals.create(req.body).then((data) => res.json(data)).catch(next);
    }
    else{
        res.json({error: 'The input field is empty'})
    }
});

module.exports = router;