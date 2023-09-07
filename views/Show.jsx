// views/Show.jsx
const React = require("react"); // Import React

const Show = (props) => {
  const { log } = props;

  return (
    <div>
      <h1>Log Details</h1>
      <p>
        <strong>Title:</strong> {log.title}
      </p>
      <p>
        <strong>Entry:</strong> {log.entry}
      </p>
      <p>
        <strong>Is Ship Broken:</strong> {log.isShipBroken ? "Yes" : "No"}
      </p>
      {log.createdAt && (
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(log.createdAt).toLocaleString()}
        </p>
      )}
      <a href="/logs">Back to Log Index</a>
    </div>
  );
};

export default Show;
