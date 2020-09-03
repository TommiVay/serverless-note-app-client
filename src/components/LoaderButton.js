import React from "react";
import { Button } from "react-bootstrap";
import "./LoaderButton.css";
import { BiRefresh } from "react-icons/bi";
export default function ({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <BiRefresh className="spinning" />}
      {props.children}
    </Button>
  );
}
