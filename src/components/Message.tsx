import React from 'react';
import { Message } from '../types';

interface MessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'message-right' : 'message-left'}`}>
      {!isCurrentUser && <span className="message-sender">{message.sender}</span>}
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default Message;
