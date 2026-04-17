/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  MessageSquare, 
  User as UserIcon, 
  Settings, 
  Bell, 
  Heart, 
  X, 
  Zap, 
  MapPin, 
  Clock, 
  ChevronRight,
  Filter,
  RefreshCw,
  MoreHorizontal,
  PlusCircle,
  Send,
  Lock,
  Lightbulb,
  BadgeCheck as Verified,
  Palette,
  Terminal,
  Mountain as Hiking,
  BookOpen,
  Camera,
  Trophy,
  Rocket,
  Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { 
  MOCK_USERS, 
  MOCK_CIRCLES, 
  MOCK_ACTIVITIES, 
  MOCK_MESSAGES, 
  User, 
  Circle, 
  Activity, 
  Message 
} from './data/mock';

type View = 'home' | 'discover' | 'messages' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('discover');
  const [isIncognito, setIsIncognito] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'discover':
        return <DiscoverView />;
      case 'messages':
        return <MessagesView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DiscoverView />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 h-16 bg-surface/70 backdrop-blur-md px-6 flex justify-between items-center border-b border-outline/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
            <img 
              src="https://picsum.photos/seed/me/100/100" 
              alt="My Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-lg font-black font-headline tracking-tighter">新点缘分</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavButton active={currentView === 'home'} onClick={() => setCurrentView('home')}>首页</NavButton>
          <NavButton active={currentView === 'discover'} onClick={() => setCurrentView('discover')}>发现</NavButton>
          <NavButton active={currentView === 'messages'} onClick={() => setCurrentView('messages')}>消息</NavButton>
          <NavButton active={currentView === 'profile'} onClick={() => setCurrentView('profile')}>我的</NavButton>
        </div>

        <button 
          onClick={() => setIsIncognito(!isIncognito)}
          className={cn(
            "font-label tracking-tighter text-[10px] font-bold border px-3 py-1 rounded-full transition-all uppercase",
            isIncognito 
              ? "bg-primary text-white border-primary" 
              : "text-primary border-primary/20 hover:bg-surface-container"
          )}
        >
          {isIncognito ? "隐身开启" : "隐身模式"}
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-24 pb-32 px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50 bg-surface/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-outline/10 flex justify-around items-center p-2">
        <MobileNavButton 
          icon={<Home className="w-5 h-5" />} 
          label="首页" 
          active={currentView === 'home'} 
          onClick={() => setCurrentView('home')} 
        />
        <MobileNavButton 
          icon={<Search className="w-5 h-5" />} 
          label="发现" 
          active={currentView === 'discover'} 
          onClick={() => setCurrentView('discover')} 
        />
        <MobileNavButton 
          icon={<MessageSquare className="w-5 h-5" />} 
          label="消息" 
          active={currentView === 'messages'} 
          onClick={() => setCurrentView('messages')} 
        />
        <MobileNavButton 
          icon={<UserIcon className="w-5 h-5" />} 
          label="我的" 
          active={currentView === 'profile'} 
          onClick={() => setCurrentView('profile')} 
        />
      </nav>
    </div>
  );
}

function NavButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "font-label tracking-tighter text-sm transition-all relative py-1 px-1",
        active ? "text-primary font-bold" : "text-outline hover:text-on-surface"
      )}
    >
      {children}
      {active && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full"
        />
      )}
    </button>
  );
}

function MobileNavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all",
        active ? "bg-primary/10 text-primary" : "text-outline"
      )}
    >
      {icon}
      <span className="text-[10px] uppercase font-label font-bold mt-1 tracking-widest">{label}</span>
    </button>
  );
}

// --- Views ---

function HomeView() {
  return (
    <div className="max-w-lg mx-auto space-y-12">
      {/* Event Banner */}
      <section>
        <div className="relative overflow-hidden rounded-3xl bg-primary text-on-primary p-8 shadow-xl shadow-primary/20">
          <div className="relative z-10">
            <span className="font-label text-xs uppercase tracking-[0.2em] opacity-80 mb-3 block">近期活动</span>
            <h2 className="font-headline font-extrabold text-3xl mb-6">周五桌游局</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 font-label text-sm">
                <Clock className="w-4 h-4 opacity-70" />
                18:00 - 21:00
              </div>
              <div className="flex items-center gap-2 font-label text-sm">
                <MapPin className="w-4 h-4 opacity-70" />
                B座休息区
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Home className="w-32 h-32" />
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-headline font-bold text-2xl">智能推荐</h3>
          <span className="font-label text-xs text-secondary font-bold uppercase">[状态: 已优化]</span>
        </div>

        <div className="relative">
          <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden shadow-2xl border border-outline/5 transition-all group">
            <div className="relative aspect-[3/4]">
              <img 
                src={MOCK_USERS[0].avatar} 
                alt="Recommendation" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/90 via-transparent to-transparent" />
              <div className="absolute top-6 right-6">
                <div className="bg-white/20 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/30">
                  <span className="font-label text-[10px] text-white tracking-widest uppercase font-bold">新点认证</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="font-headline font-extrabold text-4xl">{MOCK_USERS[0].name}</h4>
                    <p className="font-label text-secondary-container text-sm font-bold tracking-tight mt-2 italic">
                      匹配度: {MOCK_USERS[0].matchRate}
                    </p>
                  </div>
                  <div className="bg-primary/30 backdrop-blur-xl rounded-2xl p-3 border border-primary/20 text-primary-fixed">
                    <Verified className="w-6 h-6 fill-current" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex flex-wrap gap-2 text-[10px] font-label font-bold uppercase tracking-widest text-outline">
                <span className="bg-surface-container-high px-4 py-2 rounded-full">{MOCK_USERS[0].dept}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {MOCK_USERS[0].tags.map(tag => (
                   <span key={tag} className="bg-surface-container text-xs px-4 py-1.5 rounded-full font-medium">{tag}</span>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button className="col-span-1 h-14 rounded-2xl flex items-center justify-center bg-surface-container text-outline hover:bg-surface-container-high transition-all active:scale-90">
                  <X className="w-6 h-6" />
                </button>
                <button className="col-span-1 h-14 rounded-2xl flex items-center justify-center bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all active:scale-90">
                  <Heart className="w-6 h-6 fill-current" />
                </button>
                <button className="col-span-2 h-14 rounded-2xl flex items-center justify-center bg-primary text-white font-headline font-bold text-sm tracking-widest uppercase hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                  申请认识
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action */}
      <div className="fixed bottom-28 right-8 z-40">
        <button className="w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
          <Zap className="w-8 h-8 fill-current" />
        </button>
      </div>
    </div>
  );
}

function DiscoverView() {
  return (
    <div className="space-y-16">
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div>
            <span className="font-label text-secondary uppercase tracking-[0.3em] text-xs font-bold mb-4 block">同频发现</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              发现协议之外的<br/><span className="text-primary italic">共鸣.</span>
            </h1>
          </div>
          <p className="text-on-surface-variant text-xl max-w-lg font-body leading-relaxed">
            过滤职场喧嚣，寻找真实共鸣。让你的职业轨迹与性格色彩精准对齐。
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-700" />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-fixed rounded-full text-on-secondary-fixed">
                <Zap className="w-4 h-4 fill-current" />
                <span className="font-label text-[10px] uppercase font-bold tracking-widest">心跳检测</span>
              </div>
              <div>
                <h3 className="font-headline text-3xl font-bold mb-3 tracking-tight">进行同频测试</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">测定你的心理匹配度，解锁高契合度的职场伙伴。</p>
              </div>
              <div className="font-label text-secondary text-xs flex items-center gap-3">
                <span className="opacity-40 tracking-widest uppercase">[状态: 就绪]</span>
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                <span className="font-bold">用时: 4 分钟</span>
              </div>
              <button className="w-full h-14 bg-gradient-to-r from-primary to-primary-container text-white font-label font-bold uppercase tracking-widest text-xs rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                开始校准
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-surface-container-low p-8 rounded-[2rem] gap-8 grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-4 flex justify-between items-center mb-2">
          <h2 className="font-headline text-xl font-bold">精准筛选</h2>
          <button className="text-primary font-label text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-all">
            重置 <RefreshCw className="w-3 h-3" />
          </button>
        </div>
        <FilterItem label="部门" value="排除研发部" />
        <FilterItem label="兴趣爱好" placeholder="例如：徒步、Rust、爵士乐" isInput />
        <FilterItem label="年龄段" value="24 - 38" isRange />
        <FilterItem label="家乡" placeholder="不限" isInput icon={<MapPin className="w-4 h-4" />} />
      </section>

      {/* Main List */}
      <section className="space-y-10">
        <div className="flex items-baseline justify-between px-2">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight underline decoration-primary/20 underline-offset-8">已匹配伙伴</h2>
          <div className="font-label text-secondary text-xs font-bold tracking-widest uppercase">[数量: 14 位高匹配度]</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Card */}
          <div className="md:col-span-2 bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-xl group hover:shadow-2xl transition-all duration-500">
            <div className="md:w-[45%] h-80 md:h-auto overflow-hidden relative">
              <img 
                src={MOCK_USERS[1].avatar} 
                alt="Match" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-primary/80 backdrop-blur-xl px-4 py-1.5 rounded-full text-white font-label text-[10px] font-bold uppercase tracking-widest">
                最高契合
              </div>
            </div>
            <div className="md:w-[55%] p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline text-3xl font-bold tracking-tight">{MOCK_USERS[1].name}</h4>
                  <span className="font-label text-secondary text-sm font-bold bg-secondary/5 px-3 py-1 rounded-full">{(MOCK_USERS[1].matchRate * 100).toFixed(0)}% 匹配</span>
                </div>
                <p className="font-label text-[10px] text-outline uppercase font-bold tracking-[0.2em]">{MOCK_USERS[1].role} // {MOCK_USERS[1].dept} // {MOCK_USERS[1].location}</p>
                <p className="text-on-surface-variant text-base leading-relaxed font-body">
                  {MOCK_USERS[1].bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {MOCK_USERS[1].tags.map(tag => (
                    <span key={tag} className="bg-surface-container-high px-4 py-2 rounded-full text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
              <button className="w-full h-14 border-2 border-primary/10 rounded-full font-label text-xs uppercase font-bold tracking-[0.2em] text-primary hover:bg-primary hover:text-white transition-all mt-8">
                发起连接
              </button>
            </div>
          </div>

          {/* Side Card */}
          <div className="bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col justify-between shadow-lg group hover:bg-white transition-all">
            <div className="space-y-8">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-8 ring-surface-container-low">
                <img src={MOCK_USERS[2].avatar} alt="Match" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline text-2xl font-bold tracking-tight">{MOCK_USERS[2].name}</h4>
                  <span className="font-label text-secondary text-xs font-bold">{(MOCK_USERS[2].matchRate * 100).toFixed(0)}%</span>
                </div>
                <p className="font-label text-[10px] text-outline uppercase font-bold tracking-widest">{MOCK_USERS[2].role} // {MOCK_USERS[2].location}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{MOCK_USERS[2].bio}</p>
              </div>
            </div>
            <button className="w-full h-12 bg-surface-container-high rounded-full font-label text-[10px] uppercase font-bold tracking-widest hover:bg-primary hover:text-white transition-all mt-8">
              打招呼
            </button>
          </div>
        </div>
      </section>

      {/* Circles */}
      <section className="space-y-10">
        <div className="flex items-baseline justify-between px-2">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight">活动圈子</h2>
          <button className="font-label text-primary text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-8">查看全部</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_CIRCLES.map(circle => (
            <div key={circle.id} className="bg-surface-container p-8 rounded-[2rem] group hover:bg-white hover:shadow-xl transition-all h-[320px] flex flex-col">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary/5 transition-colors">
                {getCircleIcon(circle.icon)}
              </div>
              <div className="flex-1 space-y-3">
                <h5 className="font-headline font-bold text-xl tracking-tight">{circle.name}</h5>
                <p className="text-on-surface-variant text-xs font-body leading-relaxed">{circle.description}</p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-slate-200" />
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-slate-300" />
                  <div className="w-8 h-8 rounded-full border-2 border-surface-container bg-primary text-[8px] flex items-center justify-center text-white font-bold">+{circle.memberCount - 2}</div>
                </div>
                <button className="h-10 px-6 bg-white text-primary font-label text-[10px] font-bold uppercase tracking-widest rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                  加入
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FilterItem({ label, value, placeholder, isInput, isRange, icon }: { label: string, value?: string, placeholder?: string, isInput?: boolean, isRange?: boolean, icon?: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label className="font-label text-[10px] uppercase font-bold tracking-[0.2em] text-outline ml-3">{label}</label>
      <div className="relative">
        {isInput ? (
          <div className="flex items-center">
             <input 
              type="text"
              placeholder={placeholder}
              className="w-full h-12 bg-surface-container-lowest border-none rounded-2xl font-body text-sm px-6 focus:ring-2 focus:ring-primary/10 placeholder:text-outline/40"
            />
            <div className="absolute right-4 text-outline/40">
              {icon || <Search className="w-4 h-4" />}
            </div>
          </div>
        ) : isRange ? (
          <div className="flex items-center gap-4 h-12 px-2">
            <input type="range" className="flex-1 accent-primary" />
            <span className="font-label text-xs font-bold text-on-surface-variant min-w-[3rem] text-right">{value}</span>
          </div>
        ) : (
          <div className="h-12 bg-surface-container-lowest rounded-2xl flex items-center justify-between px-6 cursor-pointer hover:bg-white transition-all">
            <span className="text-sm font-medium">{value}</span>
            <ChevronRight className="w-4 h-4 text-outline rotate-90" />
          </div>
        )}
      </div>
    </div>
  );
}

function MessagesView() {
  return (
    <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Sidebar */}
      <aside className="w-full md:w-80 space-y-6">
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-2xl">悄悄话</h2>
            <span className="font-label text-[10px] font-bold bg-secondary/10 text-secondary px-3 py-1 rounded-full uppercase tracking-widest">在线</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-[1.5rem] cursor-pointer hover:bg-white transition-all shadow-sm border border-primary/5">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-primary-fixed flex items-center justify-center">
                 <img src={MOCK_USERS[2].avatar} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{MOCK_USERS[2].name}</p>
                <p className="text-xs text-outline truncate font-body">咖啡是协议的一部分...</p>
              </div>
              <div className="text-[10px] font-label text-outline whitespace-nowrap">14:02</div>
            </div>
          </div>
        </div>

        {/* Protocol Progress */}
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-secondary" />
            <p className="font-label text-[10px] uppercase font-bold tracking-[0.2em] text-outline">协议状态</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="text-xs font-bold text-primary">步骤 2: 文本已解锁</p>
                <p className="font-label text-[10px] text-secondary font-bold">0.65 匹配度</p>
              </div>
              <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl border border-primary/5">
              <p className="font-label text-[10px] font-bold text-outline leading-tight uppercase tracking-widest">
                [状态: 已连接 // 置信度: 0.88]
              </p>
              <p className="text-xs mt-2 text-primary font-medium italic">再发送 10 条消息以解锁语音</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <section className="flex-1 bg-white rounded-[2.5rem] p-8 flex flex-col shadow-xl">
        {/* Icebreakers */}
        <div className="bg-surface-container-low rounded-2xl p-6 mb-8 relative overflow-hidden group">
          <Lightbulb className="absolute -right-2 -top-2 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-primary fill-current" />
            <p className="font-label text-[10px] font-bold uppercase tracking-widest text-primary">破冰助手</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-white px-5 py-2.5 rounded-full text-xs font-medium shadow-sm hover:bg-primary hover:text-white transition-all border border-outline/5">
              你觉得4楼新装的那台咖啡机怎么样？
            </button>
            <button className="bg-white px-5 py-2.5 rounded-full text-xs font-medium shadow-sm hover:bg-primary hover:text-white transition-all border border-outline/5">
              你看到最新的协议更新了吗？
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-8 mb-8 custom-scrollbar px-2">
          {MOCK_MESSAGES.map(msg => (
            <div key={msg.id} className={cn(
              "flex items-end gap-3 max-w-[85%] animate-in fade-in slide-in-from-bottom-2",
              msg.senderId === 'me' ? "ml-auto flex-row-reverse" : ""
            )}>
              {msg.senderId !== 'me' && (
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-surface-container shadow-sm">
                  <img src={MOCK_USERS[2].avatar} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className={cn(
                "space-y-1.5",
                msg.senderId === 'me' ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                  msg.senderId === 'me' 
                    ? "bg-primary text-white rounded-tr-none font-medium" 
                    : "bg-surface-container-low text-on-surface rounded-tl-none"
                )}>
                  {msg.text}
                </div>
                <div className="font-label text-[10px] text-outline px-2 opacity-60 flex items-center gap-2">
                  {msg.senderId !== 'me' ? MOCK_USERS[2].name : "你"} • {msg.time}
                  {msg.isVerified && <Verified className="w-3 h-3 fill-current text-primary" />}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <div className="bg-tertiary/10 border border-tertiary/20 px-6 py-2 rounded-full flex items-center gap-2">
               <Lock className="w-3 h-3 text-tertiary" />
               <p className="font-label text-[10px] text-tertiary font-bold tracking-widest uppercase">达成协议：检测到共同兴趣</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="mt-auto space-y-4">
          <div className="bg-surface-container-low rounded-2xl p-2 flex items-center gap-3 border border-outline/10 focus-within:border-primary/20 transition-all">
            <button className="w-12 h-12 flex items-center justify-center text-outline hover:text-primary transition-colors">
              <PlusCircle className="w-6 h-6" />
            </button>
            <input 
              type="text" 
              placeholder="输入一条悄悄话..." 
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-body py-3"
            />
            <button className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center hover:scale-95 transition-all shadow-lg shadow-primary/20">
              <Send className="w-5 h-5 fill-current" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 opacity-60">
            <span className="w-1 h-1 bg-secondary rounded-full" />
            <p className="font-label text-[9px] text-outline uppercase tracking-[0.2em]">尊重是沟通的关键。请遵守个人职场礼仪。</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProfileView() {
  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Header */}
      <section className="relative bg-white rounded-[3rem] p-12 overflow-hidden shadow-xl border border-outline/5">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03]">
          <div className="text-[12rem] font-black font-headline tracking-tighter rotate-12 select-none uppercase">
            XINDIAN FATE
          </div>
        </div>
        
        <div className="relative flex flex-col md:flex-row items-end gap-10">
          <div className="w-48 h-64 bg-surface-container rounded-3xl overflow-hidden shadow-2xl relative group">
            <img 
              src={MOCK_USERS[1].avatar} 
              alt="Profile" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-5xl font-headline font-black tracking-tighter">{MOCK_USERS[1].name}</h1>
              <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full flex items-center gap-2 border border-primary/10">
                <Verified className="w-4 h-4 fill-current" />
                <span className="font-label text-[10px] font-bold uppercase tracking-widest">已认证员工</span>
              </div>
            </div>
            <p className="text-xl text-on-surface-variant font-body leading-relaxed max-w-2xl font-medium">
              {MOCK_USERS[1].role} @ {MOCK_USERS[1].dept}。<br />
              致力于在传统效率与现代协议之间架起桥梁。
            </p>
            <div className="flex flex-wrap gap-6 items-center pt-4">
              <div className="flex items-center gap-2 text-outline">
                <Lock className="w-4 h-4" />
                <span className="font-label text-[10px] font-bold uppercase tracking-widest">可见性: 全体已认证员工</span>
              </div>
              <div className="h-4 w-px bg-outline/20 hidden md:block" />
              <div className="font-label text-xs text-secondary font-bold tracking-widest uppercase">
                [状态: 已连接 // 匹配度: 0.94]
              </div>
            </div>
          </div>

          <button className="w-full md:w-auto bg-primary text-white h-16 px-10 rounded-full font-headline font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-95 transition-all group">
            <Mic className="w-6 h-6 group-hover:animate-pulse" />
            录制语音介绍
          </button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 space-y-8">
          <div className="bg-surface-container-low rounded-[2.5rem] p-10 space-y-8 shadow-sm">
             <div className="flex justify-between items-center px-2">
              <h2 className="text-2xl font-headline font-bold tracking-tight">生活风采</h2>
              <span className="font-label text-[10px] font-bold text-outline uppercase tracking-widest">12张照片</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-surface-container-highest rounded-2xl overflow-hidden group relative cursor-pointer shadow-sm">
                  <img 
                    src={`https://picsum.photos/seed/moment-${i}/400/400`} 
                    alt="Moment" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-label text-[10px] font-bold uppercase tracking-widest">
                      {i === 1 ? "野兽派风格" : i === 2 ? "沉浸工作" : "周末远足"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <h2 className="text-3xl font-headline font-black tracking-tighter">价值观问答</h2>
              <div className="flex-1 h-px bg-outline/10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-10">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary/30 rounded-full" />
                  <p className="font-label text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">最喜欢的食堂菜？</p>
                  <p className="text-xl font-body font-bold italic text-on-surface-variant leading-relaxed">
                    “48小时发酵的酸种玛格丽特披萨。简约的工程学，完美的结果。”
                  </p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/30 rounded-full" />
                  <p className="font-label text-[10px] font-bold text-primary uppercase tracking-widest mb-4">周末状态：写码还是徒步？</p>
                  <p className="text-xl font-body font-bold italic text-on-surface-variant leading-relaxed">
                    “一种混合循环：早起徒步清理缓存，下午写码抚慰灵魂。”
                  </p>
                </div>
              </div>
              <div className="bg-secondary text-on-secondary p-10 rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-secondary/10">
                <Heart className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 rotate-12" />
                <p className="font-label text-[10px] font-bold uppercase tracking-widest mb-6 opacity-70">核心价值观</p>
                <h3 className="text-4xl font-headline font-black tracking-tighter mb-6">极致坦诚</h3>
                <p className="text-base font-body leading-relaxed opacity-90 font-medium">
                  我相信，当数据诚实且协议透明时，人类之间才能建立起最好的连接。连接不应该只是数据交换，而是灵魂的共振。
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="md:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-lg space-y-8 border border-outline/5">
            <h2 className="text-2xl font-headline font-bold tracking-tight px-2">项目高光</h2>
            <div className="space-y-6">
              <div className="bg-primary/5 p-6 rounded-3xl border-l-8 border-primary space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-label text-[10px] font-bold text-primary uppercase tracking-widest">奖项</span>
                  <Trophy className="w-5 h-5 text-primary fill-current" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base leading-tight">Protocol Optimizer v4</h3>
                  <p className="text-xs text-on-surface-variant font-body mt-2 leading-relaxed">将核心节点集群的延迟降低了 44%。</p>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-3xl border border-outline/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-label text-[10px] font-bold text-outline uppercase tracking-widest">里程碑</span>
                  <Rocket className="w-5 h-5 text-outline" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-base leading-tight">Human Mesh Integration</h3>
                  <p className="text-xs text-on-surface-variant font-body mt-2 leading-relaxed">主导了 400 多名已认证员工的入职工作。</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- Icons Helpers ---
function getCircleIcon(iconName: string) {
  switch (iconName) {
    case 'hiking': return <Hiking className="w-6 h-6 text-primary" />;
    case 'terminal': return <Terminal className="w-6 h-6 text-primary" />;
    case 'menu_book': return <BookOpen className="w-6 h-6 text-primary" />;
    case 'palette': return <Palette className="w-6 h-6 text-primary" />;
    default: return <Search className="w-6 h-6 text-primary" />;
  }
}

