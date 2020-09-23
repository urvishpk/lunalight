import React from "react";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { Box, Button } from "@material-ui/core";
import { LoginInput, useLoginMutation, useMeQuery } from "../generated/graphql";
import { AdminLogo, Wrapper, InputField } from "./common";
import { Redirect } from "react-router-dom";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const initialValues = { username: "", password: "" };
  const [login] = useLoginMutation();
  const { data, refetch } = useMeQuery();
  if (data?.me.success) {
    return <Redirect to="/dashboard" />;
  }
  const onSubmit = async (
    values: LoginInput,
    { setSubmitting, setErrors }: FormikHelpers<LoginInput>
  ) => {
    setSubmitting(true);
    const response = await login({ variables: { options: values } });
    if (!response.data?.login) return;
    const { data, errors } = response.data.login;
    if (data) {
      refetch();
    }
    if (!errors) return;
    let { username, password } = errors;
    if (username === null) username = undefined;
    if (password === null) password = undefined;
    setErrors({
      username,
      password,
    });
    setSubmitting(false);
  };
  const loginForm = ({ isSubmitting, errors }: FormikProps<LoginInput>) => (
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
        name="password"
        type="password"
        label="Password"
        error={!!errors.password}
        helperText={errors.password}
        as={InputField}
        data-testid="passwordInput"
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
      <Wrapper testId="loginForm">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formikProps) => loginForm(formikProps)}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Login;
