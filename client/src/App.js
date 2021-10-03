import React from "react";
import Goals from "./components/Goal";
import Activities from "./components/Activity";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";

const App = () => {
  return (
    <div className="App">
      <h1>TOPS</h1>
      <Container>
        <Row>
          <Col>
            <Goals />
          </Col>
          <Col>
            <Activities />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
