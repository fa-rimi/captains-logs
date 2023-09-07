// views/Index.jsx
const React = require("react"); // Import React

const Index = (props) => {
  return (
    <div>
      <h1>Log Index</h1>
      <ul>
        {/* Render a list of log titles with links to their show pages */}
        {props.logs.map((log) => (
          <li key={log._id}>
            <a href={`/logs/${log._id}`}>{log.title}</a>
            <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
      <a href="/logs/new">Create Log</a>
    </div>
  );
};

export default Index;
