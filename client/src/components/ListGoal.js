import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { GetGoal, RemoveGoal } from "../reducer/goalSlice";

const ListGoal = ({ poolOfGoals, myGoals, goalLists }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Goals</h2>
      <ul>
        {poolOfGoals && poolOfGoals.length > 0 ? (
          poolOfGoals.map((goal) => {
            return (
              <li key={goal._id}>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={() => {
                      if (!ClickPOGGoal(goal, goalLists)) {
                        dispatch(GetGoal(goal));
                      } else {
                        dispatch(RemoveGoal(goal));
                      }
                    }}
                  />
                  <label
                    style={{ color: "#ffffff", paddingLeft: "10px" }}
                    class="form-check-label"
                    for="flexRadioDefault1"
                  >
                    {goal.goal}
                  </label>
                </div>
              </li>
            );
          })
        ) : (
          <li>All goals are selected</li>
        )}
      </ul>
    </div>
  );
};

function ClickPOGGoal(goal, goalLists) {
  // If goal is already selected
  if (goalLists.IsGoalInMyGoals(goal)) {
    goalLists.RemoveFromMyGoal(goal);
    return true;
  }
  // If goal isn't selected
  else {
    goalLists.AddMyGoal(goal);
    return false;
  }
}

export default ListGoal;
