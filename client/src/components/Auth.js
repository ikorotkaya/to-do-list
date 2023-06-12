import { useState } from "react";

const Auth = () => {
  const [isLogIn, setLogIn] = useState(true);
  const [error, setError] = useState(null);

  const viewLogIn = (status) => {
    setLogIn(status);
    setError(null);
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up!"}</h2>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {!isLogIn && <input type="password" placeholder="confirm password" />}
          <input type="submit" className="create" />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogIn(false)}
            style={{backgroundColor: !isLogIn ? "white" : "lightgray"}}
          >Sign Up</button>
          <button onClick={() => viewLogIn(true)}
            style={{backgroundColor: isLogIn ? "white" : "lightgray"}}
          >Log In</button>
        </div>

      </div>
    </div>
  );
}

export default Auth;