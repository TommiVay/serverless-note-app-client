import React, { useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useField } from "../libs/hooks/useField";
import "./BillingForm.css";

const BillingForm = ({ isLoading, onSubmit, ...props }) => {
  const name = useField("text");
  const storage = useField("number");
  const [isProcessing, setIsprocessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  isLoading = isProcessing || isLoading;

  const validateForm = () =>
    name.value !== "" && storage.value !== "" && isCardComplete;

  const handleSubmitClick = async (event) => {
    event.preventDefault();

    setIsprocessing(true);
    const { token, error } = await props.stripe.createToken({
      name: name.value,
    });

    setIsprocessing(false);
    onSubmit(storage.value, { token, error });
  };

  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <FormGroup size="lg" controlId="storage">
        <FormLabel>Storage</FormLabel>
        <FormControl
          min="0"
          {...removeReset(storage)}
          placeholder="Number of notes to store"
        />
      </FormGroup>
      <hr />
      <FormGroup size="lg" controlId="name">
        <FormLabel>Cardholder&apos;s name</FormLabel>
        <FormControl {...removeReset(name)} placeholder="Name on the card" />
      </FormGroup>
      <FormLabel>Credit Card Info</FormLabel>
      <CardElement
        className="card-field"
        onChange={(e) => setIsCardComplete(e.complete)}
        style={{
          base: { fontSize: "18px", fontFamily: '"Open sans", sans-serif' },
        }}
      />
      <LoaderButton
        block
        type="submit"
        size="lg"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  );
};

export default injectStripe(BillingForm);
