import React from "react";

const ListGoal = ({ goals, myGoals }) => {
  return (
    <div>
      <ul>
        {goals && goals.length > 0 ? (
          goals.map((goal) => {
            return (
              <li key={goal._id} onClick={() => ClickGoal(goal, myGoals)}>
                {goal.goal}
              </li>
            );
          })
        ) : (
          <li>No Goals left</li>
        )}
      </ul>
      <ul>
        {myGoals && myGoals.length > 0 ? (
          myGoals.map((goal) => {
            return (
              <li key={goal._id} onClick={() => ClickMyGoal(goal, myGoals)}>
                {goal.goal}
              </li>
            );
          })
        ) : (
          <li>No Goals left</li>
        )}
      </ul>
    </div>
  );
};

function ClickGoal(goal, myGoals) {
  myGoals.push(goal);
  console.log(goal);
  console.log(myGoals);
}

function ClickMyGoal(goal, myGoals) {
  myGoals.push(goal);
}

export default ListGoal;
