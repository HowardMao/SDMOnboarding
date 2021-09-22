import React, { Component } from "react";
import axios from "axios";
import Input from "./Input";
import ListGoal from "./ListGoal";

class Goal extends Component {
  state = {
    goals: [],
    myGoals: [],
  };

  componentDidMount() {
    this.getGoals();
  }

  getGoals = () => {
    axios
      .get("/api/goals")
      .then((res) => {
        if (res.data) {
          this.setState({ goals: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // deleteGoals = (id) => {
  //     axios.delete(`/api/goals/${id}`)
  //         .then((res) => {
  //             if(res.data){
  //                 this.getGoals();
  //             }
  //         })
  //         .catch((err) => console.log(err));
  // };

  render() {
    let { goals, myGoals } = this.state;

    return (
      <div>
        <h1>My Goals</h1>
        <Input getGoals={this.getGoals} />
        <ListGoal
          goals={goals}
          myGoals={myGoals}
          deleteGoals={this.deleteGoals}
        />
      </div>
    );
  }
}

export default Goal;
