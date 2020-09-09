export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-north-1",
    BUCKET: "notes-app-uploads-tommiv",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://8ffh5dyws9.execute-api.us-east-1.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_pm1Ou2hzF",
    APP_CLIENT_ID: "7jccmtgconulh6gt1roq8leg5a",
    IDENTITY_POOL_ID: "us-east-2:d10db1c6-d229-4f78-8a0f-283e75008c5a",
  },
  STRIPE_KEY:
    "pk_test_51HLmnaFkyKKnWhkSnfrsvXEvWRsuhXmxWPKzhJgZliyQG8pjt71OUVGZ4Wro6RVDUoLm4XPNuGoBo8yYYh8HLL9300A4rflWUL",
};
