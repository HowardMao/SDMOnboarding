import React from "react";
import Goals from "./components/Goal";
import Activity from "./components/Activity";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {

  var activity = new Activity();
  var activities = activity.render();
  var goals = <Goals activity={activity}/>;

  return (
    <div className="App">
      <h1>TOPS</h1>
      <Container>
        <Row>
          <Col>
            {goals}
          </Col>
          <Col>
            {activities}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
