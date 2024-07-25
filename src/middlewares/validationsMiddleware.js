import { checkExact, checkSchema } from "express-validator";

export const loginSchema = checkExact(
  checkSchema({
    username: {
      errorMessage: "Invalid username",
      notEmpty: {
        errorMessage: "Username cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "Username too long",
      },
    },
    password: {
      errorMessage: "Invalid password",
      notEmpty: {
        errorMessage: "Password cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "Password too long",
      },
    },
  })
);

export const addPanelSchema = checkExact(
  checkSchema({
    host: {
      in : ["body"],
      errorMessage: "Invalid host",
      notEmpty: {
        errorMessage: "host cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "host too long",
      },
    },
    username: {
      errorMessage: "Invalid username",
      notEmpty: {
        errorMessage: "Username cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "Username too long",
      },
    },
    password: {
      errorMessage: "Invalid password",
      notEmpty: {
        errorMessage: "Password cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "Password too long",
      },
    },
    port: {
      errorMessage: "Invalid port",
      notEmpty: {
        errorMessage: "Port cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "Port too long",
      },
    },
    path: {
      isLength: {
        options: { max: 64 },
        errorMessage: "Path too long",
      },
    },
    subPort: {
      errorMessage: "Invalid subPort",
      notEmpty: {
        errorMessage: "SubPort cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "SubPort too long",
      },
    },
    subPath: {
      isLength: {
        options: { max: 64 },
        errorMessage: "SubPath too long",
      },
    },
    enable: {
      optional: true,
      isBoolean: {
        errorMessage: "true or false?",
      },
    },
  })
);

export const updatePanelSchema = checkExact(
  checkSchema({
    host: {
      optional: true,
      isLength: {
        options: { max: 64 },
        errorMessage: "host too long",
      },
    },
    username: {
      optional: true,
      isLength: {
        options: { max: 64 },
        errorMessage: "Username too long",
      },
    },
    password: {
      optional: true,
      isLength: {
        options: { max: 64 },
        errorMessage: "Password too long",
      },
    },
    port: {
      optional: true,
      isLength: {
        options: { max: 64 },
        errorMessage: "Port too long",
      },
    },
    path: {
      optional: true,
      isLength: {
        options: { max: 64 },
        errorMessage: "Path too long",
      },
    },
    subPort: {
      optional: true,
      notEmpty: {
        errorMessage: "SubPort cannot be empty",
      },
      isLength: {
        options: { max: 64 },
        errorMessage: "SubPort too long",
      },
    },
    subPath: {
      optional: true,
      isLength: {
        options: { max: 64 },
        errorMessage: "SubPath too long",
      },
    },
    enable: {
      optional: true,
      isBoolean: {
        errorMessage: "true or false?",
      },
    },
  })
);