import React from "react";
import { Form } from "semantic-ui-react";
import DraggableComponent from "./DraggableComponent";

const LogInForm = ({ draggable = false }) => {
  {
    console.log(draggable);
  }
  return draggable ? (
    <DraggableComponent
      render={
        <Form>
          <Form.Field>
            <label>Username</label>
            <input></input>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input></input>
          </Form.Field>
        </Form>
      }
    ></DraggableComponent>
  ) : (
    <Form>
      <Form.Field>
        <label>Username</label>
        <input></input>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input></input>
      </Form.Field>
    </Form>
  );
};

export default LogInForm;
