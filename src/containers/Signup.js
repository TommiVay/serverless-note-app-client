import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useField } from "../libs/hooks/useField";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

export default function Signup() {
  const email = useField("email");
  const password = useField("password");
  const confirmPassword = useField("password");
  const confirmationCode = useField("tel");
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () =>
    email.value.length > 0 &&
    password.value.length > 0 &&
    password.value === confirmPassword.value;

  const validateConfirmationForm = () => confirmationCode.value > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: email.value,
        password: password.value,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleConfirmationForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(email.value, confirmationCode.value);
      await Auth.signIn(email.value, password.value);
      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationForm}>
        <FormGroup size="lg" controlId="confrimationCode">
          <FormLabel>Confirmation Code</FormLabel>
          <FormControl
            autoFocus
            {...removeReset(confirmationCode)}
            aria-describedby="confirmationHelpBlock"
          />
          <Form.Text id="confirmationHelpBlock" muted>
            Please check your email for the code.
          </Form.Text>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </form>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" size="lg">
          <FormLabel>Email</FormLabel>
          <FormControl autoFocus {...removeReset(email)} />
        </FormGroup>
        <FormGroup controlId="password" size="lg">
          <FormLabel>Password</FormLabel>
          <FormControl {...removeReset(password)} />
        </FormGroup>
        <FormGroup controlId="confirmPassword" size="lg">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl {...removeReset(confirmPassword)} />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </form>
    );
  };

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
