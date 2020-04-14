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
    <div className="margin-top-0 email-banner">
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
              You just joined a growing community of software developers who
              want to learn and make a difference.
            </h3>
          </div>
        )}
        {!completed.status && (
          <>
            <label for="email-signup">Sign up For the Mailing List</label>
            <div className="form-container">
              <input
                type="text"
                value={email}
                id="email-signup"
                placeholder="Email"
                onChange={v => setEmail(v.target.value)}
              ></input>
              <button onClick={handleSubmit}>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailForm;
