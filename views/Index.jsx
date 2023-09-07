// views/Index.jsx
import React from "react";

const Index = (props) => {
  return (
    <div>
      <h1>Log Index</h1>
      <ul>
        {/* Render a list of log titles */}
        {props.logs.map((log) => (
          <li key={log._id}>{log.title}</li>
        ))}
      </ul>
      <a href="/logs/new">Create Log</a>
    </div>
  );
};

export default Index;
