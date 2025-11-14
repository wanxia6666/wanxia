import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { Channel } from '../types';

const ChannelList: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 从 API 获取频道数据
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await API.getChannels();
        setChannels(data);
      } catch (err) {
        console.error('Error fetching channels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  // 点击频道跳转至消息视图
  const handleChannelClick = (channelId: string) => {
    navigate(`/channels/${channelId}`);
  };

  if (loading) return <div className="loading">Loading channels...</div>;

  return (
    <div className="channel-list-container">
      <h2>Channels</h2>
      <div className="channels">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="channel-item"
            onClick={() => handleChannelClick(channel.id)}
          >
            {/* 显示频道标题的前两个字母作为 Logo */}
            <div className="channel-logo">
              {channel.title.substring(0, 2).toUpperCase()}
            </div>
            <span className="channel-name">{channel.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
