import React, { useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [isInitializing, setIsInitializing] = useState(false);

  // Fix: Implemented mandatory API key selection handshake as per Gemini rules
  const handleConnect = async () => {
    setIsInitializing(true);
    
    try {
      // Check if an API key has already been selected
      const hasKey = await window.aistudio.hasSelectedApiKey();
      
      if (!hasKey) {
        // Open the dialog for user to select a paid project API key
        await window.aistudio.openSelectKey();
      }
    } catch (err) {
      console.warn("API Key Selection interaction encountered an issue, proceeding to application...", err);
    }
    
    // Race condition: Assume success after triggering selection and proceed to app
    onStart();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="z-10 text-center max-w-3xl px-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span>Institutional Underwriting Engine</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
          APMLIFY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">OS</span>
        </h1>
        
        <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
          Deploy explainable AI for institutional credit risk. Automate document analysis with the BEE Workbench and trade secondary debt through the Grasshopper Terminal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleConnect}
            disabled={isInitializing}
            className="group relative px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-blue-50 disabled:opacity-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center space-x-3 overflow-hidden"
          >
            <span className="relative z-10">
              {isInitializing ? 'Booting OS...' : 'Initialize Risk Engine'}
            </span>
            {!isInitializing && (
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          {/* Fix: Added link to billing documentation as required */}
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-slate-900 text-slate-500 font-semibold rounded-xl border border-slate-800 hover:text-slate-300 transition-colors flex items-center space-x-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span>Billing Setup</span>
          </a>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-slate-900 pt-12">
          <div>
            <div className="text-blue-400 font-bold mb-2">BEE Workbench</div>
            <p className="text-sm text-slate-500">Autonomous document extraction and credit memo generation with traceable citations.</p>
          </div>
          <div>
            <div className="text-emerald-400 font-bold mb-2">Risk Passport</div>
            <p className="text-sm text-slate-500">Immutable risk identifiers for secondary markets, ensuring data integrity and transparency.</p>
          </div>
          <div>
            <div className="text-amber-400 font-bold mb-2">Grasshopper Trader</div>
            <p className="text-sm text-slate-500">Institutional-grade trading terminal for fractionalized debt slices and yield optimization.</p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] uppercase tracking-[0.2em] font-bold">
        Secure Enclave &copy; 2025 APMLIFY Technologies
      </div>
    </div>
  );
};

export default LandingPage;