const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creates a schema for activities, that is, a blank structure for the data that conforms to the specified MongoDB collection's ("activities"'s) structure
const activitySchema = new Schema(
  {
    activity: { type: String },
    activity_id: { type: Number },
  },
  { collection: "OnboardingActivities" }
);

// Create a model that can be used to manipulate the activities schema
const Activity = mongoose.model("activity", activitySchema);

module.exports = Activity;
