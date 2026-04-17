export interface User {
  id: string;
  name: string;
  role: string;
  dept: string;
  location: string;
  matchRate: number;
  bio: string;
  tags: string[];
  avatar: string;
  status?: string;
}

export interface Circle {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
}

export interface Activity {
  id: string;
  title: string;
  time: string;
  location: string;
  icon: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isVerified?: boolean;
}

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    role: '高级产品经理',
    dept: '云计算部 - 研发',
    location: '上海',
    matchRate: 0.99,
    bio: '热衷于探索分布式系统与人性设计的平衡点。平时喜欢攀岩和咖啡拉花。',
    tags: ['剧本杀', '骑行', '咖啡拉花'],
    avatar: 'https://picsum.photos/seed/sarah/200/200',
    status: '在线',
  },
  {
    id: 'u2',
    name: 'Marcus Thorne',
    role: '高级系统架构师',
    dept: '核心基础设施部',
    location: '深圳',
    matchRate: 0.94,
    bio: '致力于在传统效率与现代缘分之间架起桥梁。相信纯粹的代码之美。',
    tags: ['野兽派', '沉浸工作', '周末远足'],
    avatar: 'https://picsum.photos/seed/marcus/200/200',
    status: '隐身',
  },
  {
    id: 'u3',
    name: 'Elena Vance',
    role: '战略财务主任',
    dept: '财务运营部',
    location: '北京',
    matchRate: 0.84,
    bio: '痴迷于微观经济和精品咖啡文化。寻找对商业逻辑有深度认同的同频者。',
    tags: ['微观经济', '精品咖啡', '艺术展览'],
    avatar: 'https://picsum.photos/seed/elena/200/200',
    status: '忙碌',
  },
];

export const MOCK_CIRCLES: Circle[] = [
  {
    id: 'c1',
    name: '徒步小组',
    description: '本周活跃成员 128 位。',
    memberCount: 128,
    icon: 'hiking',
  },
  {
    id: 'c2',
    name: 'JS 爱好者',
    description: '分享 TS 生态系统的最新动态。',
    memberCount: 45,
    icon: 'terminal',
  },
  {
    id: 'c3',
    name: '深度工作俱乐部',
    description: '生产力和专注力的仪式感。',
    memberCount: 8,
    icon: 'menu_book',
  },
  {
    id: 'c4',
    name: '下班后艺术',
    description: '美术馆参观和写生创作。',
    memberCount: 21,
    icon: 'palette',
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: '周五桌游局',
    time: '18:00 - 21:00',
    location: 'B座休息区',
    icon: 'event_available',
  },
  {
    id: 'a2',
    title: '早晨跑步团',
    time: '07:30 - 08:30',
    location: '园区田径场',
    icon: 'directions_run',
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'u3',
    text: '我听说那些咖啡豆是从埃塞俄比亚的再生合作社采购的，确实比上个月的好喝。',
    time: '14:05',
  },
  {
    id: 'm2',
    senderId: 'me',
    text: '再生咖啡豆？难怪有股‘泥土’的后调。缘分越来越讲究了。',
    time: '14:07',
    isVerified: true,
  },
  {
    id: 'm3',
    senderId: 'u3',
    text: '哈！是泥土味还是泥浆味？我可能还是更喜欢楼下大堂的老款。',
    time: '14:09',
  },
];
