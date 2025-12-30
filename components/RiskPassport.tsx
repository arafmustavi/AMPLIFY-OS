import React from 'react';
import { LoanApplicant, RiskLevel, DecisionDriver } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface RiskPassportProps {
  loan: LoanApplicant;
  drivers: DecisionDriver[];
  analysis: string;
}

const RiskPassport: React.FC<RiskPassportProps> = ({ loan, drivers, analysis }) => {
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-600';
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch(level) {
      case RiskLevel.LOW: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case RiskLevel.MEDIUM: return 'bg-amber-100 text-amber-800 border-amber-200';
      case RiskLevel.HIGH: return 'bg-orange-100 text-orange-800 border-orange-200';
      case RiskLevel.CRITICAL: return 'bg-rose-100 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center space-x-2">
           <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
           <h3 className="font-semibold text-slate-800 uppercase tracking-wide text-sm">Loan Risk Passport</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">ID: {loan.id.toUpperCase()}</span>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{loan.companyName}</h2>
            <p className="text-slate-500 text-sm">{loan.sector} • Application Date: {loan.applicationDate}</p>
          </div>
          <div className="text-right">
             <div className={`text-4xl font-bold ${getScoreColor(loan.riskScore)}`}>{loan.riskScore}</div>
             <div className="text-xs uppercase font-bold text-slate-400 mt-1">Confidence Score</div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 uppercase mb-1">Risk Level</div>
            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getRiskBadge(loan.riskLevel)}`}>
              {loan.riskLevel}
            </span>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 uppercase mb-1">Amount</div>
            <div className="text-lg font-semibold text-slate-800">${(loan.requestAmount / 1000000).toFixed(1)}M</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="text-xs text-slate-500 uppercase mb-1">DSCR</div>
            <div className="text-lg font-semibold text-slate-800">{loan.dscr.toFixed(2)}x</div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="mb-8">
           <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center">
             <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
             AI Underwriting Rationale
           </h4>
           <div className="bg-blue-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-blue-100">
             {analysis}
           </div>
        </div>

        {/* Top Drivers Chart */}
        <div className="h-64 mb-6">
          <h4 className="text-sm font-bold text-slate-700 mb-4">Top Decision Drivers</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={drivers} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="factor" width={120} tick={{fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{fill: 'transparent'}}
              />
              <Bar dataKey="weight" barSize={20} radius={[0, 4, 4, 0]}>
                {drivers.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.impact === 'positive' ? '#10b981' : '#f43f5e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary Market Stamps */}
        <div className="mt-8 pt-6 border-t border-slate-200">
           <div className="flex justify-between items-center opacity-70">
              <div className="flex items-center space-x-2">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                <div className="text-xs">
                  <div className="font-bold text-slate-600">VERIFIED PASSPORT</div>
                  <div className="text-slate-400">Immutable Record</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-400">BLOCK: #8A72...99X</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RiskPassport;
