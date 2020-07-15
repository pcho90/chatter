import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './login.styles.scss';
import { loginUser } from '../../services/auth';
import { UserContext } from '../../contexts/user.context';

const Login = () => {
  const { push } = useHistory();
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await loginUser(input);
    setUser(user);
    push('/');
  };

  return (
    <div className='login'>
      <header>Login</header>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={input.username}
          placeholder='username'
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
        <button>Login</button>
      </form>

      <Link to='/register'>Don't have an account?</Link>
    </div>
  );
};

export default Login;
