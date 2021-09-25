const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a schema for goals, that is, a blank structure for the data that conforms to the specified MongoDB collection's ("goals"'s) structure
const goalSchema = new Schema({
    goal: {type: String},
    goal_id: {type: Number},
}, { collection: 'OnboardingGoals'});

// Create a model that can be used to manipulate the goals schema
const Goals = mongoose.model('goals', goalSchema);

module.exports = Goals;

