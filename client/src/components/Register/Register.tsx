import { Link } from 'react-router-dom';
import axios from 'axios';

import { RegisterSchema } from '../../types/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    mode: 'onChange',
    resolver: zodResolver(RegisterSchema),
  });

  const formSubmitHandler: SubmitHandler<z.infer<typeof RegisterSchema>> = (
    data: RegisterData
  ) => {
    axios.post('/auth/register', {
      username: data.username,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    });
  };

  return (
    <div className="grow flex flex-col justify-center -mt-24">
      <h1 className="text-2xl text-center font-semibold text-primary-100 mb-4">
        Register
      </h1>
      <form
        className="mx-auto max-w-md"
        onSubmit={handleSubmit(formSubmitHandler)}
      >
        <input
          type="text"
          placeholder="username"
          {...register('username')}
          className="form-input"
        />
        {errors.username && (
          <span className="text-primary-500">{errors.username.message}</span>
        )}
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
        <input
          type="password"
          placeholder="confirm password"
          {...register('confirm_password')}
          className="form-input"
        />
        {errors.confirm_password && (
          <span className="text-primary-500">
            {errors.confirm_password.message}
          </span>
        )}
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-4 text-center">
          Already a member ?{' '}
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
