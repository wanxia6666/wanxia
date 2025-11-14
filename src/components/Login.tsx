import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // 存储登录用户信息，传递到下一个视图
      localStorage.setItem('currentUser', username);
      navigate('/channels');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Messenger Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
