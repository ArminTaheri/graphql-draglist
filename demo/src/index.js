import React from "react";
import { render } from "react-dom";

import { DragList } from "../../src";

const initialList = [
  { content: "element 1" },
  { content: "element 2" },
  { content: "element 3" },
  { content: "element 4" }
];

const Paper = ({ children }) => <div>{children}</div>;

const Demo = () => {
  const [list, setList] = React.useState(initialList);
  const [insertion, setInsertion] = React.useState(null);

  return (
    <div>
      <h1>graphql-draglist Demo</h1>
      <DragList
        list={list}
        setList={setList}
        insertion={insertion}
        setInsertion={setInsertion}
        renderItem={(item, i) => <Paper key={i}>{item.content}</Paper>}
      />
    </div>
  );
};

render(<Demo />, document.querySelector("#demo"));
