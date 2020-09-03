import React, { useState } from "react";
import { useField } from "../hooks/useField";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";

export default function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const email = useField("email");
  const password = useField("password");

  const validateForm = () =>
    email.value.length > 0 && password.value.length > 0;

  const handleSumbit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(email.value, password.value);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      email.reset();
      password.reset();
      setIsLoading(false);
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
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
