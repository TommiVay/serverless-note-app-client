import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import config from "../config";

export default function Settings() {
  const [stripe, setStripe] = useState(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const billUser = (details) =>
    API.post("notes", "/billing", {
      body: details,
    });

  return <div className="Settings"></div>;
}
