
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 z-50">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter leading-none text-lg">APMLIFY</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">OS v3.1</span>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search assets, loans, or counterparties... (⌘K)" 
              className="w-96 bg-slate-900 border border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-4 border-r border-slate-800 pr-6 mr-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">AI Logic Unit</span>
            <span className="text-[11px] text-emerald-500 font-mono font-bold flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
              GEMINI-3-PRO
            </span>
          </div>
          <div className="flex flex-col items-end border-l border-slate-800 pl-4">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Market Connectivity</span>
            <span className="text-[11px] text-blue-400 font-mono font-bold">STABLE // 12ms</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-white transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-slate-950"></span>
          </button>
          
          <button className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>

          <div className="flex items-center space-x-3 border-l border-slate-800 pl-6 ml-2">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-white">Jane Doe</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Sr. Underwriter</span>
            </div>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-1 ring-slate-700">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
