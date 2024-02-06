import React from "react";
import RouteProvider from "./providers/RouteProvider";
import RootLayout from "./layout/RootLayout";
import { ContextProvider } from "./providers/ContextProvider";
import Navbar from "./components/Navbar/Navbar";
import MUIThemeProvider from "./providers/MUIThemeProvider";

const App = () => {
  return (
    <ContextProvider>
      <RouteProvider>
        <MUIThemeProvider>
          <RootLayout />
        </MUIThemeProvider>
      </RouteProvider>
    </ContextProvider>
  );
};

export default App;
