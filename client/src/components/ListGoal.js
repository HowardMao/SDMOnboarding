import React from "react";

const ListGoal = ({ goals, myGoals, goalLists }) => {
  return (
    <div>
      <h2>Goals</h2>
      <ul>
        {goals && goals.length > 0 ? (
          goals.map((goal) => {
            return (
              <li key={goal._id} onClick={() => ClickGoal(goal, goalLists)}>
                {goal.goal}
              </li>
            );
          })
        ) : (
          <li>No Goals left</li>
        )}
      </ul>
      <h2>My Goals</h2>
      <ul>
        {myGoals && myGoals.length > 0 ? (
          myGoals.map((goal) => {
            return (
              <li key={goal._id} onClick={() => ClickMyGoal(goal, goalLists)}>
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

function ClickGoal(goal, goalLists) {
  goalLists.AddMyGoal(goal);
}

function ClickMyGoal(goal, goalLists) {
  goalLists.AddGoal(goal);
}

export default ListGoal;
