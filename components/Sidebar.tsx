
import React from 'react';

interface SidebarProps {
  activeModule: 'dashboard' | 'bee' | 'grasshopper';
  setActiveModule: (module: 'dashboard' | 'bee' | 'grasshopper') => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, onLogout }) => {
  
  const navItems = [
    { id: 'dashboard', label: 'Risk Cockpit', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
    )},
    { id: 'bee', label: 'BEE Workbench', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
    )},
    { id: 'grasshopper', label: 'Grasshopper Trader', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
    )}
  ] as const;

  return (
    <div className="w-64 bg-slate-900 flex flex-col h-full border-r border-slate-800 flex-shrink-0">
      <div className="p-4 border-b border-slate-800">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Navigation</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
              activeModule === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 translate-x-1'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center space-x-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-xs text-slate-300 font-medium">Production Node</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center px-2">
           <button 
             onClick={onLogout}
             title="Logout & Close Enclave"
             className="text-slate-500 hover:text-rose-400 transition-all p-2 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 group"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                <span className="text-[10px] font-bold uppercase tracking-tight hidden group-hover:inline">Logout</span>
              </div>
           </button>
           <span className="text-[10px] text-slate-600 font-mono select-none">ENCLAVE SECURE</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
