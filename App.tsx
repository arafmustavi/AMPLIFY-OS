
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import BeeWorkbench from './components/BeeWorkbench';
import GrasshopperTrader from './components/GrasshopperTrader';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<'dashboard' | 'bee' | 'grasshopper'>('dashboard');

  const handleLogout = () => {
    setIsStarted(false);
    setActiveModule('dashboard');
  };

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeModule={activeModule} 
          setActiveModule={setActiveModule} 
          onLogout={handleLogout}
        />
        
        <main className="flex-1 h-full overflow-hidden relative">
          {activeModule === 'dashboard' && <Dashboard />}
          {activeModule === 'bee' && <BeeWorkbench />}
          {activeModule === 'grasshopper' && <GrasshopperTrader />}
        </main>
      </div>
    </div>
  );
};

export default App;
