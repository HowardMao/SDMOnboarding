import React from "react";

const ListGoal = ({ poolOfGoals, myGoals, goalLists }) => {
  return (
    <div>
      <h2>Pool of Goals</h2>
      <ul>
        {poolOfGoals && poolOfGoals.length > 0 ? (
          poolOfGoals.map((goal) => {
            return (
              <li key={goal._id} onClick={() => ClickPOGGoal(goal, goalLists)}>
                {goal.goal}
              </li>
            );
          })
        ) : (
          <li>All goals are selected</li>
        )}
      </ul>
      <h2>My Goals</h2>
      <ul>
        {myGoals && myGoals.length > 0 ? (
          myGoals.map((goal) => {
            return (
              <li
                key={goal._id}
                onClick={() => ClickMyGoalsGoal(goal, goalLists)}
              >
                {goal.goal}
              </li>
            );
          })
        ) : (
          <li>No goals selected</li>
        )}
      </ul>
    </div>
  );
};

function ClickPOGGoal(goal, goalLists) {
  goalLists.AddMyGoal(goal);
}

function ClickMyGoalsGoal(goal, goalLists) {
  goalLists.AddGoal(goal);
}

export default ListGoal;
