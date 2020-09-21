import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($options: LoginInput!) {
    login(options: $options) {
      success
      message
      data {
        username
        email
      }
      errors {
        username
        password
      }
    }
  }
`;

const LOGIN_RESPONSES = [
  {
    data: {
      login: {
        success: false,
        message: "Invalid input.",
        data: null,
        errors: {
          username: "Username is required.",
          password: "Password is required.",
        },
      },
    },
  },
  {
    data: {
      login: {
        success: true,
        message: "Admin logged in.",
        data: {
          username: "urvishpk",
          password: "urvish@gmail.com",
        },
        errors: null,
      },
    },
  },
];

const REGISTER_MUTATION = gql`
  mutation Register($options: RegisterInput!) {
    register(options: $options) {
      success
      message
      data {
        username
        email
      }
      errors {
        username
        email
        password
        confirmPassword
      }
    }
  }
`;

const REGISTER_RESPONSES = [
  {
    data: {
      register: {
        success: false,
        message: "Invalid input.",
        data: null,
        errors: {
          username: "Username is required.",
          email: "Email is required.",
          password: "Password is required.",
          confirmPassword: "Confirm password is required.",
        },
      },
    },
  },
  {
    data: {
      register: {
        success: true,
        message: "Admin registered.",
        data: {
          username: "urvishpk",
          email: "urvish@gmail.com",
        },
        errors: null,
      },
    },
  },
];

export {
  LOGIN_MUTATION,
  LOGIN_RESPONSES,
  REGISTER_MUTATION,
  REGISTER_RESPONSES,
};
