import React, { useState } from "react";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [completed, setCompleted] = useState({ data: {}, status: false });
  const handleSubmit = evt => {
    if (email !== "") {
      fetch("/.netlify/functions/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ email })
      })
        .then(response => response.json())
        .then(data => setCompleted({ data, status: true }));
    }
  };
  return (
    <div className="email-form">
      <div className="control-panel">
        <span className="close-button"></span>
        <span className="min-button"></span>
        <span className="max-button"></span>
      </div>
      {completed.status && (
        <div className="msg-container">
          <h2> Thanks for joining.</h2>
          <h3>
            You just joined a growing community of software developers who want
            to learn and make a difference.
          </h3>
        </div>
      )}
      {!completed.status && (
        <>
          <div className="msg-container">
            <h2> Join Code Workshp</h2>
            <h3>
              Become a member of Code Workshop for free programming tutorials,
              news, special event access, and more sent to your email.
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
        </>
      )}
    </div>
  );
}

export default EmailForm;
