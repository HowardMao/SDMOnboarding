import React, { Component } from "react";
import axios from "axios";
import ListActivity from "./ListActivity";

class Activity extends Component {
  state = {
    allActivities: [],
    myActivities: [],
  };

  componentDidMount() {
    this.getAllActivitiesFromDB();
    document.body.addEventListener('updateActivities', this.handleEvent, false);
  }

  handleEvent(event) {
    console.log(event);


    //this.getAllMyActivities(event.detail);



  }

  // Updates myActivities
  getAllMyActivities(goal) {

    //myActivities = goal;
  }

  // Converts the array from the MongoDB activity into a dictionary
  convertArrayToDictionary() {

  }

  // Gets all the goals from the mongodb database and puts the data into poolOfGoals
  getAllActivitiesFromDB = () => {
    axios
      .get("/api/activities")
      .then((res) => {
        if (res.data) {
          this.setState({ allActivities: res.data });
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
