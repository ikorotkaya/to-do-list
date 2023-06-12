import { useState } from "react";
import {useCookies} from 'react-cookie';

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  const viewLogIn = (status) => {
    setError(null);
    setIsLogIn(status);
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure your passwords match!");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    // if there is an error, set the error state
    if (data.detail) {
      setError(data.detail);
    } else {
      // set the cookies 
      // Cookies are typically used for storing small pieces of data on the client-side. 
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);

      // refresh the page
      window.location.reload();
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? "Please log in" : "Please sign up!"}</h2>
          <input 
          type="email" 
          placeholder="email" 
          onChange={((e) => setEmail(e.target.value))}
          />
          <input 
          type="password" 
          placeholder="password" 
          onChange={((e) => setPassword(e.target.value))}
          autoComplete="true"
          />
          {!isLogIn && <input 
          type="password" 
          placeholder="confirm password" 
          onChange={((e) => setConfirmPassword(e.target.value))}
          autoComplete="true"
          />}
          <input 
          type="submit" 
          className="create" 
          onClick={((e) => handleSubmit(e, isLogIn ? 'login' : 'signup'))} 
          />
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