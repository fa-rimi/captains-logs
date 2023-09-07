// views/New.jsx
const React = require("react"); // Import React

const New = () => {
  return (
    <div>
      <h1>Create a New Log</h1>
      {/* Create form with action="/logs"and method="POST" */}
      <form action="/logs" method="post">
        {/* Enter title: input type text for a title */}
        <label htmlFor="">Title: </label>
        <input type="text" id="title" name="title" />
        <br />
        {/* 3. input type textarea for an entry */}
        <label htmlFor="entry">Entry:</label>
        <textarea id="entry" name="entry"></textarea>
        <br />
        {/* Checkbox for whether the ship is broken */}
        <label htmlFor="shipIsBroken">Is Ship Broken:</label>
        <input
          type="checkbox"
          id="shipIsBroken"
          name="shipIsBroken"
          value="true"
        />
        <br />
        {/* Submit form: input type submit */}
        <input type="submit" value="Create Log" />
      </form>
    </div>
  );
};

module.exports = New;
