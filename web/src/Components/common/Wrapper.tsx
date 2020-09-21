import React from "react";
import { Grid } from "@material-ui/core";

interface WrapperProps {
  testId: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, testId }) => (
  <Grid container justify="center" data-testid={testId}>
    {children}
  </Grid>
);

export default Wrapper;
