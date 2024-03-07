import React from "react";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";

const Login = (props) => {

  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Email address</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
    </FormControl>
  )
}

export default Login;