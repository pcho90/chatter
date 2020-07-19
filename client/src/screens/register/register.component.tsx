import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './register.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { registerUser } from '../../services/auth';

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    subtitle: ''
  });
  const { push } = useHistory();

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await registerUser(input);
    setUser(user);

    push('/');

    console.log(user);
  };

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
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
