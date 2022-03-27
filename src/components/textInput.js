import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function StateTextFields({ handler, value }) {
  const handleChange = (event) => {
    handler(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Name"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
