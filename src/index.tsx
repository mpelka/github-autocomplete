import React from "react";
import ReactDOM from "react-dom";
import Autocomplete from "./Autocomplete";

ReactDOM.render(
  <React.StrictMode>
    <style>
      {`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
            "Droid Sans", "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        header {
          background-color: #282c34;
          height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
      `}
    </style>
    <header>
      <Autocomplete name="search" placeholder="Search users or repositories" />
    </header>
  </React.StrictMode>,
  document.getElementById("root"),
);
