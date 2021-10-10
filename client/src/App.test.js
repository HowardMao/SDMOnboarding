import { screen, fireEvent } from "@testing-library/react";
import jest from "jest-mock";
//import { shallow } from 'enzyme';
import * as redux from "react-redux";
import App from "./App";
import Goals from "./components/Goal";
import Activity from "./components/Activity";
import { render } from "./test-utils";
import { rest } from "msw";
import { setupServer } from "msw/node";

var goal = new Goals();
var activity = new Activity();
let spyOnUseSelector;
let spyOnUseDispatch;
let mockDispatch;

export const handlers = [
  rest.get("/api/goals", (req, res, ctx) => {
    var ArrGoals = [];
    ArrGoals.push({
      _id: "1",
      goal: "Hello",
      goal_id: "1",
      vh_activities: [1],
      h_activities: [2],
    });

    ArrGoals.push({
      _id: "2",
      goal: "Hi",
      goal_id: "2",
      vh_activities: [2],
      h_activities: [2, 1],
    });

    ArrGoals.push({
      _id: "3",
      goal: "Hey There",
      goal_id: "3",
      vh_activities: [1, 2],
      h_activities: [1],
    });

    return res(ctx.json(ArrGoals), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeEach(() => {
  server.listen();

  // Mock useSelector hook
  spyOnUseSelector = jest.spyOn(redux, "useSelector");
  spyOnUseSelector.mockReturnValue([{ id: 1, text: "Old Item" }]);

  // Mock useDispatch hook
  spyOnUseDispatch = jest.spyOn(redux, "useDispatch");
  // Mock dispatch function returned from useDispatch
  mockDispatch = jest.fn();
  spyOnUseDispatch.mockReturnValue(mockDispatch);

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
    h_activities: [2, 1],
  });

  goal.state.poolOfGoals.push({
    _id: "3",
    goal: "Hey There",
    goal_id: "3",
    vh_activities: [1, 2],
    h_activities: [1],
  });

  //setting up mock activities
  var ArrayActivities = [];

  ArrayActivities.push({
    activity: "Peer Support",
    activity_id: 1,
  });

  ArrayActivities.push({
    activity: "Team Leader Assistance",
    activity_id: 2,
  });

  activity.state.allActivities =
    activity.convertsAllActivitiesArrayToDictionary(ArrayActivities);
});

afterEach(() => {
  goal = new Goals();
  activity = new Activity();
  server.resetHandlers();
});

afterEach(() => server.close());

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
  expect(goal.state.myGoals[0]._id).toEqual("1");
  expect(goal.state.myGoals[0].goal_id).toEqual("1");
  expect(goal.state.myGoals[0].goal).toEqual("Hello");
});

test("Selecting a 'Agile Goal' displays the related activities", async () => {
  //Renders acitivties
  render(activity.render());

  //Make temporary goal
  var SelectedGoal = {
    _id: "2",
    goal: "Hi",
    goal_id: "2",
    vh_activities: [2],
    h_activities: [2, 1],
  };

  //Get activities based on goal
  activity.getAllMyActivities(SelectedGoal);

  //Check if activities is in myActivities
  expect(activity.state.myActivities[2].activity).toEqual(
    "Team Leader Assistance"
  );
  expect(activity.state.myActivities[2].activity_id).toEqual(2);
});

test("Deselecting a 'Agile Goal' deselects the related activities", async () => {
  //Render the goals
  render(activity.render());

  //Make temporary goal
  var SelectedGoal = {
    _id: "2",
    goal: "Hi",
    goal_id: "2",
    vh_activities: [2],
    h_activities: [2, 1],
  };

  //Get activities based on goal
  activity.getAllMyActivities(SelectedGoal);

  //Deselect goal
  activity.removeGoalActivities(SelectedGoal);

  //Activity should not be inside myActivities
  expect(true).toEqual(!(2 in activity.state.myActivities[2]));
});

test("Deselecting a 'Agile Goal' deselects the related activities (Two goals with the same activity)", async () => {
  //Render the goals
  render(activity.render());

  //Make temporary goal
  var SelectedGoal = {
    _id: "2",
    goal: "Hi",
    goal_id: "2",
    vh_activities: [2],
    h_activities: [2, 1],
  };

  var SelectedGoal2 = {
    _id: "2",
    goal: "Hi",
    goal_id: "2",
    vh_activities: [2],
    h_activities: [2],
  };

  //Get activities based on goal
  activity.getAllMyActivities(SelectedGoal);

  //Get activities based on goal
  activity.getAllMyActivities(SelectedGoal2);

  //Deselect goal
  activity.removeGoalActivities(SelectedGoal);

  //Activity should still be inside myActivities
  expect(false).toEqual(!(2 in activity.state.myActivities[2]));
});
