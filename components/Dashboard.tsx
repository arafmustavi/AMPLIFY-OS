
import React, { useState, useEffect, useRef } from 'react';
import RiskPassport from './RiskPassport';
import { LoanApplicant, RiskLevel, DecisionDriver } from '../types';
import { explainRiskScore } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [selectedLoanId, setSelectedLoanId] = useState<string>('ln-001');
  const [incomeModifier, setIncomeModifier] = useState<number>(0);
  const [tenureModifier, setTenureModifier] = useState<number>(0);
  const [aiAnalysis, setAiAnalysis] = useState<string>('Initializing analysis...');
  const [drivers, setDrivers] = useState<DecisionDriver[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const requestCount = useRef(0);

  const loans: LoanApplicant[] = [
    {
      id: 'ln-001',
      companyName: 'Apex Logistics LLC',
      sector: 'Transportation',
      requestAmount: 2500000,
      applicationDate: '2023-10-15',
      riskScore: 78,
      riskLevel: RiskLevel.LOW,
      status: 'Underwriting',
      ebitda: 1200000,
      dscr: 1.45,
      leverageRatio: 2.1,
      tenureMonths: 36
    },
    {
      id: 'ln-002',
      companyName: 'Bistro Chain Inc.',
      sector: 'Hospitality',
      requestAmount: 850000,
      applicationDate: '2023-10-18',
      riskScore: 62,
      riskLevel: RiskLevel.MEDIUM,
      status: 'Underwriting',
      ebitda: 300000,
      dscr: 1.15,
      leverageRatio: 3.5,
      tenureMonths: 24
    }
  ];

  const selectedLoan = loans.find(l => l.id === selectedLoanId) || loans[0];

  useEffect(() => {
    const fetchAnalysis = async (currentRequestId: number) => {
      setIsUpdating(true);
      const result = await explainRiskScore(selectedLoan, { income: incomeModifier, tenure: tenureModifier });
      
      if (currentRequestId === requestCount.current) {
        setAiAnalysis(result.analysis);
        setDrivers(result.drivers);
        setQuotaExhausted(result.error === 'QUOTA_EXHAUSTED');
        setIsUpdating(false);
      }
    };

    requestCount.current += 1;
    const currentId = requestCount.current;
    
    const timer = setTimeout(() => {
      fetchAnalysis(currentId);
    }, 1200);

    return () => clearTimeout(timer);
  }, [selectedLoan, incomeModifier, tenureModifier]);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1500);
    setTimeout(() => setSaveStatus('idle'), 4000);
  };

  const simulatedScore = Math.min(100, Math.max(0, selectedLoan.riskScore + (incomeModifier * 0.5) - (tenureModifier * 0.2)));

  return (
    <div className="h-full flex bg-slate-50 overflow-hidden">
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Risk Cockpit</h2>
          <div className="mt-2 relative">
            <input 
              type="text" 
              placeholder="Search loans..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loans.map(loan => (
            <div 
              key={loan.id}
              onClick={() => {
                setSelectedLoanId(loan.id);
                setIncomeModifier(0);
                setTenureModifier(0);
                setQuotaExhausted(false);
                setSaveStatus('idle');
              }}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-all hover:bg-slate-50 ${selectedLoanId === loan.id ? 'bg-blue-50 border-l-4 border-l-blue-600 shadow-inner' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`font-bold text-sm ${selectedLoanId === loan.id ? 'text-blue-900' : 'text-slate-800'}`}>{loan.companyName}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${loan.riskScore >= 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  Score: {loan.riskScore}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{loan.sector}</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Notional: ${(loan.requestAmount / 1000).toFixed(0)}k</span>
                <span className="flex items-center"><span className="w-1 h-1 bg-slate-300 rounded-full mr-1"></span> {loan.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 flex space-x-6 overflow-hidden relative">
        <div className="flex-1 h-full flex flex-col space-y-4">
           <div className="flex-1 min-h-0">
             <RiskPassport 
                loan={{...selectedLoan, riskScore: Math.round(simulatedScore)}} 
                drivers={drivers} 
                analysis={aiAnalysis} 
             />
           </div>
           
           <div className="flex space-x-3">
             <button 
              onClick={handleSave}
              className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all ${
                saveStatus === 'saved' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
              }`}
             >
               {saveStatus === 'saving' ? (
                 <>
                   <svg className="animate-spin h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   <span>Persisting...</span>
                 </>
               ) : saveStatus === 'saved' ? (
                 <>
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                   <span>Analysis Committed</span>
                 </>
               ) : (
                 <>
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                   <span>Commit to Passport</span>
                 </>
               )}
             </button>
             <button className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-white hover:shadow-md transition-all active:scale-95">
               Flag for Peer Review
             </button>
           </div>
        </div>

        <div className="w-80 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full">
           <div className="mb-8">
             <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center">
               <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
               Stress Tester
             </h3>
             <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">Parametric Override Engine</p>
           </div>

           <div className="space-y-10 flex-1">
              <div className="group">
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-slate-500 font-bold uppercase">Macro Stability</span>
                  <span className={`font-mono font-bold ${incomeModifier >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {incomeModifier > 0 ? '+' : ''}{incomeModifier}%
                  </span>
                </div>
                <input 
                  type="range" min="-30" max="30" step="5"
                  value={incomeModifier}
                  onChange={(e) => setIncomeModifier(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-bold uppercase">
                  <span>Recession</span>
                  <span>Expansion</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-slate-500 font-bold uppercase">Term Expansion</span>
                  <span className="font-mono font-bold text-slate-800">
                    {tenureModifier > 0 ? '+' : ''}{tenureModifier}M
                  </span>
                </div>
                <input 
                  type="range" min="-12" max="12" step="6"
                  value={tenureModifier}
                  onChange={(e) => setTenureModifier(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className={`p-5 rounded-2xl border-2 transition-all duration-500 ${quotaExhausted ? 'bg-amber-50 border-amber-200' : 'bg-slate-900 border-slate-800 shadow-xl'}`}>
                <h4 className={`text-[10px] font-bold mb-4 flex justify-between items-center tracking-widest uppercase ${quotaExhausted ? 'text-amber-800' : 'text-slate-500'}`}>
                  <span>Live Projections</span>
                  {isUpdating && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span></span>}
                </h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className={`text-[10px] font-bold ${quotaExhausted ? 'text-amber-600' : 'text-slate-400'}`}>SIMULATED RATING</span>
                    <span className={`text-2xl font-black font-mono leading-none ${quotaExhausted ? 'text-amber-900' : 'text-white'}`}>{Math.round(simulatedScore)}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className={`text-[10px] font-bold ${quotaExhausted ? 'text-amber-600' : 'text-slate-400'}`}>DELTA</span>
                    <span className={`text-sm font-bold font-mono ${simulatedScore - selectedLoan.riskScore >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {simulatedScore - selectedLoan.riskScore > 0 ? '▲' : '▼'} {Math.abs(Math.round(simulatedScore - selectedLoan.riskScore))} PTS
                    </span>
                  </div>
                </div>
              </div>
           </div>

           <button 
             className="mt-10 w-full bg-white border border-slate-200 text-slate-400 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:text-slate-800 hover:border-slate-800 transition-all active:scale-95"
             onClick={() => { setIncomeModifier(0); setTenureModifier(0); setQuotaExhausted(false); }}
           >
             Clear Parameters
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
