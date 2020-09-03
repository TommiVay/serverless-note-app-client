export const onError = (error) => {
  let message = error.toString();

  //auth errors
  //auth package thros errors in different format
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(message);
};
