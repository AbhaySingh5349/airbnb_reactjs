import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { LoginSchema } from '../../types/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof LoginSchema>> = (
    data: LoginData
  ) => {
    axios.post('/auth/register', {
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="grow flex flex-col justify-center -mt-24">
      <h1 className="text-2xl text-center font-semibold text-primary-100 mb-4">
        Login
      </h1>
      <form
        className="mx-auto max-w-md"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <input
          type="email"
          placeholder="abc@email.com"
          {...register('email')}
          className="form-input"
        />
        {errors.email && (
          <span className="text-primary-500">{errors.email.message}</span>
        )}
        <input
          type="password"
          placeholder="password"
          {...register('password')}
          className="form-input"
        />
        {errors.password && (
          <span className="text-primary-500">{errors.password.message}</span>
        )}
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Loging-in...' : 'Login'}
        </button>
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
