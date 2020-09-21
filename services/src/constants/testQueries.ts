export const registerMutations = [
  `
    mutation {
        register(
            options: {
                username: ""
                password: ""
                confirmPassword: ""
                email: ""
            }
        ) {
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
  `,
  `
    mutation {
        register(
            options: {
                username: "urvishpk"
                password: "12345678"
                confirmPassword: "12345678"
                email: "urvish@urvish.com"
            }
        ) {
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
  `,
  `
    mutation {
        register(
            options: {
                username: "urvishpk"
                password: "12345678"
                confirmPassword: "12345678"
                email: "urvish@urvish.com"
            }
        ) {
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
  `,
];

export const loginMutations = [
  `
    mutation {
        login(options: { username: "", password: "" }) {
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
  `,
  `
    mutation {
        login(options: { username: "urvish", password: "12345678" }) {
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
  `,
  `
    mutation {
        login(options: { username: "urvishpk", password: "1234567" }) {
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
  `,
  `
    mutation {
        login(options: { username: "urvishpk", password: "12345678" }) {
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
  `,
];

export const meQueries = [
  `
      query {
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
  `,
];

export const logoutMutations = [
  `
    mutation {
        login(options: { username: "urvishpk", password: "12345678" }) {
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
  `,
];
