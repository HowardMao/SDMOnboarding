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

  // // Adds a goal to myGoals
  // AddMyGoal(goal) {
  //   // Adds the parameter goal to myGoals
  //   console.log("wiu");
  //   var TempMyGoals = this.state.myGoals;
  //   TempMyGoals.push(goal);
  //   this.setState({
  //     myGoals: TempMyGoals,
  //   });
  // }

  // // Remove a goal my MyGoals
  // RemoveFromMyGoal(goal) {
  //   var TempMyGoals = this.state.myGoals;
  //   const index = TempMyGoals.indexOf(goal);
  //   if (index > -1) {
  //     TempMyGoals.splice(index, 1);
  //   }
  //   this.setState({
  //     myGoals: TempMyGoals,
  //   });
  // }

  // // Checks My Goals for a goal and returns true if value is found
  // IsGoalInMyGoals(goal) {
  //   var TempMyGoals = this.state.myGoals;
  //   const index = TempMyGoals.indexOf(goal);
  //   console.log(TempMyGoals);
  //   if (index > -1) {
  //     return true;
  //   }
  //   return false;
  // }

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
