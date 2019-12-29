import React, { useEffect, useState } from "react";

function EmailForm({}) {
  const [email, setEmail] = useState("");
  const [data, setData] = useState({ data: {}, fetching: false });
  const handleSubmit = evt => {
    if (email !== "") {
      fetch("/.netlify/functions/hello")
        .then(response => response.json())
        .then(data => setData(data));
    }
  };
  return (
    <div className="email-form">
      <div className="control-panel">
        <span className="close-button"></span>
        <span className="min-button"></span>
        <span className="max-button"></span>
      </div>
      <div className="msg-container">
        <h2> Join Code Workshp</h2>
        <h3>
          Become a member of Code Workshop for free programming tutorials, news,
          special event access, and more sent to your email.
        </h3>
      </div>
      <div className="form-container">
        <input
          type="text"
          value={email}
          onChange={v => setEmail(v.target.value)}
        ></input>
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </div>
  );
}

export default EmailForm;
