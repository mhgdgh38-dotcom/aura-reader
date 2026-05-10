import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { BookOpen, ChevronLeft, Type, Moon, Sun, Share2, Bookmark, Plus, Settings } from 'lucide-react';
import { cn } from './utils'; // 见下方工具函数

// --- 预设书籍数据 ---
const INITIAL_BOOKS = [
  { id: 1, title: "瓦尔登湖", author: "亨利·戴维·梭罗", progress: 35, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800", content: "那是最好的时代...（此处为长文本内容）" },
  { id: 2, title: "禅与摩托车维修艺术", author: "罗伯特·波西格", progress: 82, cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800", content: "关于如何寻找生活的质感..." },
];

export default function AuraReaderApp() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState('home'); // home, settings

  // 切换暗黑模式
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark transition-colors duration-700 selection:bg-blue-100 dark:selection:bg-blue-900">
      
      {/* 顶部动态状态栏 */}
      <nav className="fixed top-0 w-full h-16 z-40 px-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!selectedBook ? (
          <HomeView onSelectBook={setSelectedBook} />
        ) : (
          <ReaderView book={selectedBook} onExit={() => setSelectedBook(null)} />
        )}
      </AnimatePresence>

      {/* 底部导航栏 */}
      {!selectedBook && (
        <motion.footer 
          initial={{ y: 100 }} animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-full shadow-apple border border-white/20 flex items-center gap-10 z-50"
        >
          <button className="text-blue-500"><BookOpen size={22} /></button>
          <button className="text-slate-400"><Plus size={22} /></button>
          <button className="text-slate-400"><Settings size={22} /></button>
        </motion.footer>
      )}
    </div>
  );
}

// --- 视图组件：首页 ---
function HomeView({ onSelectBook }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-8 pt-24 pb-40"
    >
      <header className="mb-16">
        <h1 className="text-4xl font-serif font-bold tracking-tight dark:text-white">书房</h1>
        <p className="text-slate-400 mt-2">你有 2 本书正在阅读</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
        {INITIAL_BOOKS.map((book) => (
          <motion.div
            key={book.id}
            layoutId={`card-${book.id}`}
            onClick={() => onSelectBook(book)}
            className="group cursor-pointer"
          >
            <motion.div 
              layoutId={`cover-${book.id}`}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-apple transition-transform duration-500 group-hover:scale-[1.02]"
            >
              <img src={book.cover} className="w-full h-full object-cover" alt="" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-blue-500" style={{ width: `${book.progress}%` }} />
              </div>
            </motion.div>
            <motion.div layoutId={`info-${book.id}`} className="mt-4">
              <h3 className="font-serif font-bold dark:text-white">{book.title}</h3>
              <p className="text-sm text-slate-400">{book.author}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- 视图组件：阅读页 ---
function ReaderView({ book, onExit }) {
  const [showUI, setShowUI] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      layoutId={`card-${book.id}`}
      className="fixed inset-0 z-50 bg-paper-light dark:bg-paper-dark overflow-y-auto"
      onClick={() => setShowUI(!showUI)}
    >
      {/* 沉浸式进度条 */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[60]" style={{ scaleX }} />

      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }}
            className="fixed top-0 w-full h-20 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-6 z-50"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onExit} className="p-2 dark:text-white"><ChevronLeft /></button>
            <span className="font-serif font-bold dark:text-white">{book.title}</span>
            <button className="p-2 dark:text-white"><Share2 size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <article className="max-w-2xl mx-auto px-8 pt-40 pb-60 prose prose-slate dark:prose-invert prose-headings:font-serif">
        <motion.h1 layoutId={`info-${book.id}`} className="text-4xl text-center mb-12">{book.title}</motion.h1>
        <div className="font-serif text-xl leading-[2] text-slate-800 dark:text-slate-200">
           {/* 这里放置大量示例文本内容 */}
           <p>阅读是一种主动的沉浸。在这个快速迭代的世界里，寻找一个能够安静思考的角落变得尤为奢侈。Aura Reader 的诞生，就是为了在数字世界中为你开辟这样一块“瓦尔登湖”。</p>
           <p>我们追求的不是功能的堆砌，而是体验的“消融”。当界面消失，只剩下文字与你的思想对话时，我们的目的就达到了。</p>
           <p>（此处可以循环生成更多段落以测试滚动体验...）</p>
        </div>
      </article>

      {/* 阅读器控制台 */}
      <AnimatePresence>
        {showUI && (
          <motion.div 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl px-8 py-4 rounded-full shadow-apple flex items-center gap-8 z-50 border border-white/20"
            onClick={e => e.stopPropagation()}
          >
            <Type size={20} className="dark:text-white cursor-pointer" />
            <Bookmark size={20} className="dark:text-white cursor-pointer" />
            <div className="text-xs font-mono dark:text-slate-400">35%</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
