import React, { useState, ChangeEvent } from 'react';

import './register.styles.scss';
import { registerUser } from '../../services/auth';

const Register = () => {
  const [input, setInput] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    subtitle: ''
  });

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await registerUser(input);

    console.log(user);
  };

  return (
    <div className='register'>
      <header>Register</header>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          onChange={handleChange}
          value={input.name}
          placeholder='name'
          autoComplete='off'
        />
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={input.username}
          placeholder='username'
          autoComplete='off'
        />
        <input
          type='text'
          name='email'
          onChange={handleChange}
          value={input.email}
          placeholder='email'
          autoComplete='off'
        />
        <input
          type='password'
          name='password'
          onChange={handleChange}
          value={input.password}
          placeholder='password'
          autoComplete='off'
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
