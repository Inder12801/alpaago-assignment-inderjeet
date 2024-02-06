import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#271340",
  //     contrastText: "#fff",
  //   },
  // },
});

const MUIThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUIThemeProvider;
