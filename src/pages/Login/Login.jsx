import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setsignState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (signState === 'Sign in') {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  // Return statement must be inside curly braces {}
  return (
    loading ? (
      <div className="Loginspiner">
        <img src={netflix_spinner} alt="" />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} className='login-logo' alt="" />
        <div className="login-form">
          <h1>{signState}</h1>
          <form>
            {signState === "Sign Up" ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='Your Name'
              />
            ) : null}
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your E-mail'
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <button onClick={user_auth} type='submit'>{signState}</button>
            <div className="form-help">
              <div className="remember">
                <input type="checkbox" />
                <label htmlFor=""> Remember me</label>
              </div>
              <p>Need Help</p>
            </div>
          </form>
          <div className="form-switch">
            {signState === "Sign Up" ? (
              <p>
                New to Netflix?{" "}
                <span onClick={() => setsignState("Sign In")}>Sign In Now</span>
              </p>
            ) : (
              <p>
                Already Have Account{" "}
                <span onClick={() => setsignState("Sign Up")}>Sign Up Now</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
