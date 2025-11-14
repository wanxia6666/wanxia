import { Channel, Message } from './types';

// 模拟 API 服务，实际替换为真实接口地址
export const API = {
  // 获取所有频道
  getChannels: async (): Promise<Channel[]> => {
    const res = await fetch('https://mock-api.example.com/channels');
    if (!res.ok) throw new Error('Failed to fetch channels');
    return res.json();
  },

  // 获取单个频道的消息
  getChannelMessages: async (channelId: string): Promise<Message[]> => {
    const res = await fetch(`https://mock-api.example.com/channels/${channelId}/messages`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },
};
