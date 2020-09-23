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

const ME_QUERY = gql`
  query Me {
    me {
      success
      message
      data {
        username
        email
      }
      errors {
        user
      }
    }
  }
`;

const ME_RESPONSES = [
  {
    data: {
      me: {
        success: false,
        message: "User not logged in.",
        data: null,
        errors: {
          user: "You are not logged in.",
        },
      },
    },
  },
  {
    data: {
      me: {
        success: true,
        message: "Admin is logged in.",
        data: {
          username: "urvishpk",
          email: "urvish@gmail.com",
        },
        errors: null,
      },
    },
  },
];

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
      data {
        done
      }
      errors {
        done
      }
    }
  }
`;

const LOGOUT_RESPONSES = [
  {
    data: {
      me: {
        success: true,
        message: "Admin is logged out.",
        data: {
          done: true,
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
  ME_QUERY,
  ME_RESPONSES,
  LOGOUT_MUTATION,
  LOGOUT_RESPONSES,
};
