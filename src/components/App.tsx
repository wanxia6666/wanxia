import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ChannelList from './components/ChannelList';
import MessageView from './components/MessageView';
import './index.css';

const App: React.FC = () => {
  // 检查是否已登录
  const isLoggedIn = !!localStorage.getItem('currentUser');

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 登录路由 */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/channels" /> : <Login />} />
          
          {/* 频道列表路由 */}
          <Route path="/channels" element={isLoggedIn ? <ChannelList /> : <Navigate to="/" />} />
          
          {/* 单频道消息路由 */}
          <Route path="/channels/:channelId" element={isLoggedIn ? <MessageView /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
