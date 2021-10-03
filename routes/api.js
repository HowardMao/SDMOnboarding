const express = require("express");
const router = express.Router();
const Goals = require("../models/goals");
const Activities = require("../models/activities");

//Uses the 'Goals' model from '../models/goals.js' to find all goals
router.get("/goals", (req, res, next) => {
  console.log("trying to get mongo data");
  Goals.find({})
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

//I have no clue wtf this does cause I haven't tested it out yet
router.post("/goals", (req, res, next) => {
  if (req.body.action) {
    Goals.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({ error: "The input field is empty" });
  }
});

//Uses the 'Activities' model from '../models/activites.js' to find all activites
router.get("/activities", (req, res, next) => {
  Activities.find({})
    .then((data) => {
      res.json(data);
    })
    .catch(next);
});

module.exports = router;
