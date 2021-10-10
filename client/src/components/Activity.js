import React, { Component } from "react";
import axios from "axios";
import ListActivity from "./ListActivity";
import store from "../store";
import { connect } from "react-redux";
import { Reset } from "../reducer/goalSlice";

class Activity extends Component {
  state = {
    allActivities: {},
    myActivities: {},
    activitiesCountDict: {},
  };

  componentDidMount() {
    this.getAllActivitiesFromDB();

    store.subscribe(() => {
      console.log(store.getState());
      this.getAllMyActivities(store.getState().goal.goal.payload);
    });
    store.subscribe(() =>
      this.removeGoalActivities(store.getState().goal.deletedGoal.payload)
    );
  }

  /**
   * Gets Goal's related activties (e.g.)
   * The vh & h activities and returns them in a variable
   * @param {Goal} goal
   */
  getAllMyActivities(goal) {
    //When Redux updates. Avoid function when goal is undefined
    if (typeof goal == "undefined") {
      return;
    }

    var activities = this.state.myActivities;
    var activitiesCount = this.state.activitiesCountDict;

    // Iterate through the vh_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
    for (let i in goal.vh_activities) {
      activities[goal.vh_activities[i]] =
        this.state.allActivities[goal.vh_activities[i]];

      this.addActivityCount(activitiesCount, goal.vh_activities[i]);
    }

    // Iterate through the h_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
    for (let i in goal.h_activities) {
      activities[goal.h_activities[i]] =
        this.state.allActivities[goal.h_activities[i]];

      this.addActivityCount(activitiesCount, goal.h_activities[i]);
    }

    this.setState({
      myActivities: activities,
      activitiesCountDict: activitiesCount,
    });

    store.dispatch(Reset());
  }

  /**
   * Adds count to the amount of times the activity has been repeated
   * @param {*} activitiesCount
   * @param {*} activity_id
   */
  addActivityCount(activitiesCount, activity_id) {
    if (!(activity_id in activitiesCount)) {
      activitiesCount[activity_id] = 1;
    } else {
      activitiesCount[activity_id] = activitiesCount[activity_id] + 1;
    }
  }

  /**
   * Removes Goal's activites from the list, and keep same activities that appear in other goals
   * @param {Goal} goal
   * @returns
   */
  removeGoalActivities(goal) {
    //When Redux updates. Avoid function when goal is undefined
    if (typeof goal == "undefined") {
      return;
    }
    var activitiesCount = this.state.activitiesCountDict;

    if (typeof goal !== "undefined") {
      for (let i in goal.vh_activities) {
        activitiesCount = this.removeActivityCount(
          activitiesCount,
          goal.vh_activities[i]
        );
      }
      // Iterate through the h_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
      for (let i in goal.h_activities) {
        activitiesCount = this.removeActivityCount(
          activitiesCount,
          goal.h_activities[i]
        );
      }
    }

    this.setState({
      activitiesCountDict: activitiesCount,
    });

    store.dispatch(Reset());
  }

  /**
   * Removes activity count by one when related goal is removed. If count is 0 remove from myActivities
   * @param {*} activitiesCount
   * @param {*} activity_id
   * @returns
   */
  removeActivityCount(activitiesCount, activity_id) {
    if (!(activity_id in activitiesCount)) {
      return activitiesCount;
    } else {
      if (activitiesCount[activity_id] > 1) {
        activitiesCount[activity_id] = activitiesCount[activity_id] - 1;
      } else {
        var TempActivities = this.state.myActivities;
        delete TempActivities[activity_id];

        this.setState({
          myActivities: TempActivities,
        });

        delete activitiesCount[activity_id];
      }
    }

    return activitiesCount;
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

  /**
   * Converts the array from the MongoDB activity into a dictionary
   * @param {*} array
   * @returns
   */
  convertsAllActivitiesArrayToDictionary(array) {
    var dictionary = {};
    for (var item in array) {
      dictionary[array[item].activity_id] = array[item];
    }
    return dictionary;
  }

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
