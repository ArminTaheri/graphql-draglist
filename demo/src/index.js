import React from "react";
import { render } from "react-dom";

import Demo from "./Demo";

const App = () => {
  return (
    <div>
      <h1>graphql-draglist Demo</h1>
      <Demo />
    </div>
  );
};

render(<App />, document.querySelector("#demo"));
