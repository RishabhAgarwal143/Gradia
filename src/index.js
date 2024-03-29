import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { ThemeProvider, createTheme } from "@aws-amplify/ui-react";
import { studioTheme } from "./ui-components";

const updatedTheme = createTheme(
  {
    // Extend the theme to update the button color
    name: "my-theme-updates",
    tokens: {
      components: {
        button: {
          primary: {
            backgroundColor: {
              value: "#b71c1c",
            },
          },
        },
      },
    },
  },
  studioTheme
);

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={updatedTheme}>
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
