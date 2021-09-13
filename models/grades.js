const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a schema for grades, that is, a blank structure for the data that conforms to the specified MongoDB collection's ("grades"'s) structure
const gradeSchema = new Schema({
    student_id: {type: Number},
    scores: {type: Array},
    class_id: {type: Number}
}, { collection: 'grades'});

// Create a model that can be used to manipulate the grades schema
const Grades = mongoose.model('grades', gradeSchema);

module.exports = Grades;

