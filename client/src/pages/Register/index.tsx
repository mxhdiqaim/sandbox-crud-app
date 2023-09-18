import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
// import { useAuth, clearErrors, register } from "../../context/auth/AuthState";
import { useAuth, clearErrors, register } from "../../context/users/UserState";
import { Link } from "react-router-dom";

const Register = (props: any) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors(authDispatch);
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e: any) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(authDispatch, {
        name,
        email,
        password,
      });
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
      <Link to="/login">Signin</Link>
    </div>
  );
};

export default Register;
