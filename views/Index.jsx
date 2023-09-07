// views/Index.jsx
import React from "react";

const Index = (props) => {
  return (
    <div>
      <h1>Log Index</h1>
      <ul>
        {/* Render a list of log details including title, entry, and ship status */}
        {props.logs.map((log) => (
          <li key={log._id}>
            <strong>Title:</strong> {log.title}
            <br />
            <strong>Entry:</strong> {log.entry}
            <br />
            <strong>Is Ship Broken:</strong> {log.isShipBroken ? "Yes" : "No"}
          </li>
        ))}
      </ul>
      <a href="/logs/new">Create Log</a>
    </div>
  );
};

export default Index;
