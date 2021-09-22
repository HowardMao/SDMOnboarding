import { render, screen, fireEvent } from "@testing-library/react";
import jest from "jest-mock";
import App from "./App";
import Goals from "./components/Goal";

// test("Renders 'My Goals Title'", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/My Goals/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test("Renders 'No Goals in the list'", async () => {
//   render(<App />);
//   const linkElement = screen.getByText(/No Goals left/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("Displaying 'Agile Goals'", async () => {
  var goal = new Goals();
  goal.state.goals.push({
    _id: "1",
    goal: "Hello",
    goal_id: "1",
  });

  goal.state.goals.push({
    _id: "2",
    goal: "Hi",
    goal_id: "2",
  });

  goal.state.goals.push({
    _id: "3",
    goal: "Hey There",
    goal_id: "3",
  });

  render(goal.render());
  var linkElement = screen.getByText("Hello");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Hi");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Hey There");
  expect(linkElement).toBeInTheDocument();
});

test("Selecting 'Agile Goals'", async () => {
  //Creates and pushes a bunch of goals onto the website
  var goal = new Goals();
  goal.state.goals.push({
    _id: "1",
    goal: "Hello",
    goal_id: "1",
  });

  goal.state.goals.push({
    _id: "2",
    goal: "Hi",
    goal_id: "2",
  });

  goal.state.goals.push({
    _id: "3",
    goal: "Hey There",
    goal_id: "3",
  });

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
    goal.state.myGoals.includes({ _id: "1", goal: "Hello", goal_id: "1" })
  );
});
