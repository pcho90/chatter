import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './register.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { registerUser } from '../../services/auth';

interface Error {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    subtitle: ''
  });
  const [error, setError] = useState<Error | null>(null);

  const { push } = useHistory();

  const handleChange = (e: React.ChangeEvent) => {
    let { name, value } = e.target as HTMLInputElement;

    if (name === 'username') {
      value = value.replace(/[^A-Za-z0-9]/gi, '');
    } else if (name === 'email') {
      value = value.replace(/[^A-Za-z@.]/gi, '');
    } else if (name === 'name') {
      value = value.replace(/[^A-Za-z\s]/gi, '');
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.username.length < 4) {
      setError(prev => ({
        ...prev,
        username: 'Username must be at least 4 characters.'
      }));
    }
    if (input.password.length < 6) {
      setError(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters.'
      }));
    }
    if (input.name.length < 1) {
      setError(prev => ({
        ...prev,
        name: 'Name cannot be blank.'
      }));
    }
    if (input.email.length < 1) {
      setError(prev => ({
        ...prev,
        email: 'Email cannot be blank.'
      }));
    }

    if (
      input.username.length >= 4 &&
      input.password.length >= 6 &&
      input.name.length >= 1
    ) {
      const user = await registerUser(input);
      setUser(user);
      push('/');
    }
  };

  useEffect(() => {
    setError(null);
  }, [input]);

  return (
    <div className='register'>
      <header>Register</header>
      <form onSubmit={handleSubmit}>
        <label className={`${input.name.length ? 'shrink' : ''} name-label`}>
          Name
        </label>
        <input
          className='name-input'
          type='text'
          name='name'
          onChange={handleChange}
          value={input.name}
          autoComplete='off'
        />
        {error && error.name && error.name.length > 0 && (
          <span className='error'>{error.name}</span>
        )}
        <label
          className={`${input.username.length ? 'shrink' : ''} username-label`}
        >
          Username
        </label>
        <input
          className='username-input'
          type='text'
          name='username'
          onChange={handleChange}
          value={input.username}
          autoComplete='off'
        />
        {error && error.username && error.username.length > 0 && (
          <span className='error'>{error.username}</span>
        )}
        <label className={`${input.email.length ? 'shrink' : ''} email-label`}>
          Email
        </label>
        <input
          className='email-input'
          type='text'
          name='email'
          onChange={handleChange}
          value={input.email}
          autoComplete='off'
        />
        {error && error.email && error.email.length > 0 && (
          <span className='error'>{error.email}</span>
        )}
        <label
          className={`${input.password.length ? 'shrink' : ''} password-label`}
        >
          Password
        </label>
        <input
          className='password-input'
          type='password'
          name='password'
          onChange={handleChange}
          value={input.password}
          autoComplete='off'
        />
        {error && error.password && error.password.length > 0 && (
          <span className='error'>{error.password}</span>
        )}
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
