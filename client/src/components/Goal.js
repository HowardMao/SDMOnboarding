import React, { Component } from "react";
import axios from "axios";
import ListGoal from "./ListGoal";

class Goal extends Component {

  constructor(props) {
    super(props);
    this.FireUpdateActivityEvent = this.FireUpdateActivityEvent.bind(this);
  }

  state = {
    poolOfGoals: [],
    myGoals: [],
  };

  componentDidMount() {
    this.getGoalsFromDB();
  }

  // Sends out the goal parameter
  FireUpdateActivityEvent(goal) {
    var event = new CustomEvent('updateActivities', { detail: goal });

    // Fires an event "updateActivities" for Activities class to listen 
    window.dispatchEvent(event);
  }

  // Gets all the goals from the mongodb database and puts the data into poolOfGoals
  getGoalsFromDB = () => {
    axios
      .get("/api/goals")
      .then((res) => {
        if (res.data) {
          this.setState({ poolOfGoals: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Adds a goal to myGoals
  AddMyGoal(goal) {
    // Adds the parameter goal to myGoals
    var TempMyGoals = this.state.myGoals;
    TempMyGoals.push(goal);
    this.setState({
      myGoals: TempMyGoals,
    });

    this.props.activity.getAllMyActivities(goal);

    //this.props.activity.getAllMyActivities(goal);
  }

  // Remove a goal my MyGoals
  RemoveFromMyGoal(goal) {
    var TempMyGoals = this.state.myGoals;
    const index = TempMyGoals.indexOf(goal);
    if (index > -1) {
      TempMyGoals.splice(index, 1);
    }
    this.setState({
      myGoals: TempMyGoals,
    });
  }

  // Checks My Goals for a goal and returns true if value is found
  IsGoalInMyGoals(goal) {
    var TempMyGoals = this.state.myGoals;
    const index = TempMyGoals.indexOf(goal);
    if (index > -1) {
      return true;
    }
    return false;
  }

  GetVHActivities(goal) {
    return goal.vh_activities;
  }

  render() {
    let { poolOfGoals, myGoals } = this.state;

    return (
      <div>
        <ListGoal
          poolOfGoals={poolOfGoals}
          myGoals={myGoals}
          goalLists={this}
        />
      </div>
    );
  }
}

export default Goal;
