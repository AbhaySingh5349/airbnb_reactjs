import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="grow flex flex-col justify-center -mt-24">
      <h1 className="text-2xl text-center font-semibold text-primary-100 mb-4">
        Login
      </h1>
      <form className="mx-auto max-w-md">
        <input
          type="email"
          placeholder="abc@email.com"
          className="form-input"
        ></input>
        <input
          type="password"
          placeholder="password"
          className="form-input"
        ></input>
        <button className="btn btn-primary">Login</button>
        <div className="mt-4 text-center">
          Don't have an account yet ?{' '}
          <Link to="/register" className="btn btn-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
