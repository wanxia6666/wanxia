// 用户类型
export interface User {
  name: string;
}

// 消息类型
export interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: string;
}

// 频道类型
export interface Channel {
  id: string;
  title: string;
  messages: Message[];
}
