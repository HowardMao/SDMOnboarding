import React, { Component } from "react";
import axios from "axios";
import Input from "./Input";
import ListGoal from "./ListGoal";

class Goal extends Component {
  state = {
    goals: [],
    myGoals: [],
  };

  constructor(props) {
    super(props);

    this.AddMyGoal = this.AddMyGoal.bind(this);
  }

  componentDidMount() {
    this.getGoalsFromDB();
  }
  

  getGoalsFromDB = () => {
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

  AddMyGoal(goal) {
    var TempMyGoals = this.state.myGoals;
    var TempGoals = this.state.goals;
    TempMyGoals.push(goal);
    this.setState({
      myGoals: TempMyGoals,
    });

    const index = TempGoals.indexOf(goal);
    if (index > -1) {
      TempGoals.splice(index, 1);
    }

    this.setState({
      goals: TempGoals,
    });
  }

  AddGoal(goal) {
    var TempMyGoals = this.state.myGoals;
    var TempGoals = this.state.goals;
    TempGoals.push(goal);
    this.setState({
      goals: TempGoals,
    });

    const index = TempMyGoals.indexOf(goal);
    if (index > -1) {
      TempMyGoals.splice(index, 1);
    }

    this.setState({
      myGoals: TempMyGoals,
    });
  }

  render() {
    let { goals, myGoals } = this.state;

    return (
      <div>
        <h1>My Goals</h1>
        <Input getGoals={this.getGoalsFromDB} />
        <ListGoal
          goals={goals}
          myGoals={myGoals}
          goalLists={this}
          deleteGoals={this.deleteGoals}
        />
      </div>
    );
  }
}

export default Goal;
