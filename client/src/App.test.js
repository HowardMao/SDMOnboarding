import { render, screen, fireEvent } from "@testing-library/react";
import jest from "jest-mock";
import App from "./App";
import Goals from "./components/Goal";
import Activity from "./components/Activity";

var goal = new Goals();

beforeEach(()=>{
  //setting up mock goals
  goal.state.poolOfGoals.push({
    _id: "1",
    goal: "Hello",
    goal_id: "1",
    vh_activities: [1],
    h_activities: [2],
  });

  goal.state.poolOfGoals.push({
    _id: "2",
    goal: "Hi",
    goal_id: "2",
    vh_activities: [2],
    h_activities: [2,1],
  });

  goal.state.poolOfGoals.push({
    _id: "3",
    goal: "Hey There",
    goal_id: "3",
    vh_activities: [1,2],
    h_activities: [1],
  });

  //setting up mock activities
  // activity.state.allActivities.push({
  //   activity: "Peer Support",
  //   activity_id: 1,
  // });

  // activity.state.allActivities.push({
  //   activity: "Team Leader Assistance",
  //   activity_id: 2,
  // });
})

afterEach(()=>{
  goal = new Goals();
  // activity = new Activ
})

test("Displaying 'Agile Goals'", async () => {
  render(goal.render());
  var linkElement = screen.getByText("Hello");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Hi");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Hey There");
  expect(linkElement).toBeInTheDocument();
});

test("Selecting 'Agile Goals'", async () => {
  //Render the goals
  render(goal.render());
  //Gets a goal and checks whether it's on the website
  var selectedGoal = screen.getByText("Hello");
  expect(selectedGoal).toBeInTheDocument();

  //Click on goal once and checks whether it was clicked only once
  const handleClick = jest.fn();
  selectedGoal.onclick = handleClick;
  fireEvent.click(selectedGoal);
  expect(handleClick).toHaveBeenCalledTimes(1);

  //Check if 'My Goals' is updated with the new Goal 'Hello'
  expect(
    goal.state.myGoals.includes({ _id: "222", goal: "wefwagg", goal_id: "5" })
  );
});
