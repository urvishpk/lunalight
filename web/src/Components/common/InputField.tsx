import React from "react";
import { Box, TextField, TextFieldProps } from "@material-ui/core";

const InputField: React.FC<TextFieldProps> = (props) => {
  return (
    <Box p={2} width="inherit">
      <TextField fullWidth {...props} variant="outlined" />
    </Box>
  );
};

export default InputField;
