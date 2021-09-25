import React, { Component } from "react";
import axios from "axios";
import Input from "./Input";
import ListGoal from "./ListGoal";

class Goal extends Component {
  state = {
    poolOfGoals: [],
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
          this.setState({ poolOfGoals: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  AddMyGoal(goal) {
    var TempMyGoals = this.state.myGoals;
    var TempPOGGoals = this.state.poolOfGoals;
    TempMyGoals.push(goal);
    this.setState({
      myGoals: TempMyGoals,
    });

    const index = TempPOGGoals.indexOf(goal);
    if (index > -1) {
      TempPOGGoals.splice(index, 1);
    }

    this.setState({
      poolOfGoals: TempPOGGoals,
    });
  }

  AddGoal(goal) {
    var TempMyGoals = this.state.myGoals;
    var TempPOGGoals = this.state.poolOfGoals;
    TempPOGGoals.push(goal);
    this.setState({
      poolOfGoals: TempPOGGoals,
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
    let { poolOfGoals, myGoals } = this.state;

    return (
      <div>
        <h1>TOPS</h1>
        <Input getGoals={this.getGoalsFromDB} />
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
