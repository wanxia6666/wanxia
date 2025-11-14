import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Message } from '../types';
import MessageComponent from './Message';

const MessageView: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('currentUser') || '';

  // 从 API 获取当前频道的消息
  useEffect(() => {
    if (!channelId) return;

    const fetchMessages = async () => {
      try {
        const data = await API.getChannelMessages(channelId);
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [channelId]);

  // 发送新消息（模拟，实际需对接 API 提交）
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && channelId) {
      const newMsg: Message = {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toISOString(),
        sender: currentUser,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  if (loading) return <div className="loading">Loading messages...</div>;

  return (
    <div className="message-view-container">
      {/* 返回按钮 */}
      <button className="back-btn" onClick={() => navigate('/channels')}>
        ←
      </button>
      <h2>Channel: {channelId}</h2>
      
      {/* 消息列表 */}
      <div className="messages-container">
        {messages.map((msg) => (
          <MessageComponent
            key={msg.id}
            message={msg}
            isCurrentUser={msg.sender === currentUser}
          />
        ))}
      </div>
      
      {/* 发送消息表单 */}
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          placeholder="Type new message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-btn">Send</button>
      </form>
    </div>
  );
};

export default MessageView;
