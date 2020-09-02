import React from "react";
import { useField } from "../hooks/useField";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const email = useField("email");
  const password = useField("password");

  const validateForm = () =>
    email.value.length > 0 && password.value.length > 0;

  const handleSumbit = async (event) => {
    event.preventDefault();

    try {
      await Auth.signIn(email.value, password.value);
      userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      email.reset();
      password.reset();
    }
  };

  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;

  return (
    <div className="Login">
      <form onSubmit={handleSumbit}>
        <FormGroup controlId="email" size="lg">
          <FormLabel>Email</FormLabel>
          <FormControl size="lg" autoFocus {...removeReset(email)} />
        </FormGroup>
        <FormGroup controlId="password" size="lg">
          <FormLabel>Password</FormLabel>
          <FormControl size="lg" {...removeReset(password)} />
        </FormGroup>
        <Button block size="lg" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
