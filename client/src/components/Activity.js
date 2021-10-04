import React, { Component } from "react";
import axios from "axios";
import ListActivity from "./ListActivity";

class Activity extends Component {
  state = {
    allActivities: {},
    myActivities: [],
  };
  constructor(props){
    super(props);
  }


  componentDidMount() {
    this.getAllActivitiesFromDB();


    window.addEventListener('updateActivities',  (event) => {
     // this.getAllMyActivities(event.detail);
    });

  }

  // gets the vh & h activities and returns them in a variable
  getAllMyActivities(goal){

    console.log(":)");
    var activities = {};
    // Iterate through the vh_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
    for(let i in goal.vh_activities){
      activities[goal.vh_activities[i]] = this.state.allActivities[goal.vh_activities[i]];
    }

    // Iterate through the h_activities array in goal and add the <activity_id><activity> pair into the activities dictionary
    for(let i in goal.h_activities){
      activities[goal.h_activities[i]] = this.state.allActivities[goal.h_activities[i]];
    }
    
    // Convert the activities dictionary into an array by ignoring the activity_id and just using the activity data
    var newActivities = Object.values(activities);
  
    var tempMyActivities = this.state.myActivities;
    tempMyActivities += newActivities;

    this.setState({ myActivities: tempMyActivities});
  }
  
  // Converts the array from the MongoDB activity into a dictionary
  convertsAllActivitiesArrayToDictionary(array) {
    var dictionary = {};
    for(var item in array){
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
          this.setState({ allActivities: this.convertsAllActivitiesArrayToDictionary(res.data)});
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
          myActivities={myActivities}
          activityLists={this}
        />
      </div>
    );
  }
}

export default Activity;
