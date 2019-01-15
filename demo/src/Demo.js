import React from "react";

import { DragList } from "../../src";

const Paper = ({ children }) => (
  <div style={{ padding: "15px", width: "300px", border: "solid 1px" }}>
    {children}
  </div>
);

const templist = [
  { content: "element 0" },
  { content: "element 1" },
  { content: "element 2" },
  { content: "element 3" }
];

const Demo = () => {
  const [list, setList] = React.useState(templist);
  const [insertion, setInsertion] = React.useState(null);

  return (
    <DragList
      list={list}
      setList={setList}
      insertion={insertion}
      setInsertion={setInsertion}
      renderItem={(item, i) => <Paper key={i}>{item.content}</Paper>}
    />
  );
};

export default Demo;
