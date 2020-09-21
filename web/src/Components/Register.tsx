import React from "react";
import { History, LocationState } from "history";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { AdminLogo, InputField, Wrapper } from "./common";
import { Box, Button } from "@material-ui/core";
import { RegisterInput, useRegisterMutation } from "../generated/graphql";

interface RegisterProps {
  history?: History<LocationState>;
}

export const Register: React.FC<RegisterProps> = ({ history }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [register] = useRegisterMutation();
  const onSubmit = async (
    values: RegisterInput,
    { setSubmitting, setErrors }: FormikHelpers<RegisterInput>
  ) => {
    setSubmitting(true);
    const response = await register({ variables: { options: values } });
    if (!response.data?.register) return;
    const { data, errors } = response.data.register;
    if (data) {
      history?.push("/");
      return;
    }
    if (!errors) return;
    let { username, email, password, confirmPassword } = errors;
    if (username === null) username = undefined;
    if (email === null) email = undefined;
    if (password === null) password = undefined;
    if (confirmPassword === null) confirmPassword = undefined;
    setErrors({
      username,
      email,
      password,
      confirmPassword,
    });
    setSubmitting(false);
  };
  const registerForm = ({
    isSubmitting,
    errors,
  }: FormikProps<RegisterInput>) => (
    <Form>
      <Field
        name="username"
        label="Username"
        error={!!errors.username}
        helperText={errors.username}
        as={InputField}
        data-testid="usernameInput"
      />
      <Field
        name="email"
        label="Email"
        error={!!errors.email}
        helperText={errors.email}
        as={InputField}
        data-testid="emailInput"
      />
      <Field
        name="password"
        label="Password"
        type="password"
        error={!!errors.password}
        helperText={errors.password}
        as={InputField}
        data-testid="passwordInput"
      />
      <Field
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        as={InputField}
        data-testid="confirmPasswordInput"
      />
      <br />
      <Box display="flex" justifyContent="center" width="100%">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          data-testid="submitButton"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Box>
    </Form>
  );
  return (
    <>
      <AdminLogo />
      <Wrapper testId="registerForm">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formikProps) => registerForm(formikProps)}
        </Formik>
      </Wrapper>
    </>
  );
};
