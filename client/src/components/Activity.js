import React, { Component } from "react";
import axios from "axios";
import ListActivity from "./ListActivity";
import store from "../store";

class Activity extends Component {
  state = {
    allActivities: {},
    myActivities: {},
  };

  componentDidMount() {
    this.getAllActivitiesFromDB();

    store.subscribe(() =>
      this.getAllMyActivities(store.getState().goal.goal.payload)
    );
    store.subscribe(() =>
      this.removeGoalActivities(store.getState().goal.deletedGoal.payload)
    );
  }

  // gets the vh & h activities and returns them in a variable
  getAllMyActivities(goal) {
    var activities = this.state.myActivities;
    // Iterate through the vh_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
    for (let i in goal.vh_activities) {
      activities[goal.vh_activities[i]] =
        this.state.allActivities[goal.vh_activities[i]];
    }

    // Iterate through the h_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
    for (let i in goal.h_activities) {
      activities[goal.h_activities[i]] =
        this.state.allActivities[goal.h_activities[i]];
    }

    this.setState({ myActivities: activities });
  }

  removeGoalActivities(goal) {
    console.log(goal);
  }

  // Converts the array from the MongoDB activity into a dictionary
  convertsAllActivitiesArrayToDictionary(array) {
    var dictionary = {};
    for (var item in array) {
      dictionary[array[item].activity_id] = array[item];
    }
    return dictionary;
  }

  // Gets all the goals from the mongodb database and puts the data into poolOfGoals
  getAllActivitiesFromDB = () => {
    axios
      .get("/api/activities")
      .then((res) => {
        if (res.data) {
          this.setState({
            allActivities: this.convertsAllActivitiesArrayToDictionary(
              res.data
            ),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { allActivities, myActivities } = this.state;

    return (
      <div>
        <ListActivity
          allActivities={allActivities}
          myActivities={Object.values(myActivities)}
          activityLists={this}
        />
      </div>
    );
  }
}

export default Activity;
