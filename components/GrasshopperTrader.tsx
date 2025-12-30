
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const GrasshopperTrader: React.FC = () => {
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const [sliceAmount, setSliceAmount] = useState<number>(20);
  const [isConfirming, setIsConfirming] = useState(false);
  const [txId, setTxId] = useState<string | null>(null);

  const portfolio = [
    { id: 'LN-2024-001', company: 'Apex Logistics', rating: 'A', amount: 2500000, yield: 6.5, sector: 'Transport' },
    { id: 'LN-2024-004', company: 'GreenLeaf Energy', rating: 'B+', amount: 5000000, yield: 7.2, sector: 'Energy' },
    { id: 'LN-2024-009', company: 'TechStart Inc.', rating: 'A-', amount: 1200000, yield: 6.8, sector: 'Technology' },
    { id: 'LN-2024-012', company: 'Metro Real Estate', rating: 'B', amount: 8500000, yield: 7.8, sector: 'Real Estate' },
  ];

  const toggleLoan = (id: string) => {
    setSelectedLoans(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const generateDeal = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setTxId(`TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      setIsConfirming(false);
    }, 2000);
  };

  const chartData = [
    { name: 'Retained', value: 100 - sliceAmount },
    { name: 'For Sale', value: sliceAmount },
  ];

  const totalSelectedValue = portfolio
    .filter(p => selectedLoans.includes(p.id))
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="h-full bg-slate-900 text-slate-300 flex flex-col font-mono relative">
      <div className="bg-black text-bloomberg-text px-4 py-2 flex justify-between items-center border-b border-slate-700 z-10">
        <div className="flex items-center space-x-4">
          <span className="font-bold tracking-widest text-lg">GRASSHOPPER</span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-white border border-slate-700">LIVE MARKET // NYC</span>
        </div>
        <div className="flex space-x-6 text-[10px] text-white">
          <span>US 10Y: <span className="text-green-500">4.12%</span></span>
          <span>SOFR: <span className="text-green-500">5.32%</span></span>
          <span className="animate-pulse text-bloomberg-text">SYSTEM: OPTIMAL</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-slate-800">
          <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-white uppercase mb-1">Portfolio Inventory</h2>
              <div className="flex space-x-4">
                <button className="text-[10px] bg-slate-700 text-white px-3 py-1 rounded-sm border border-slate-600">Primary Book</button>
                <button className="text-[10px] text-slate-500 px-3 py-1 hover:text-white transition">Watchlist</button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase">Available Volume</div>
              <div className="text-sm font-bold text-white">$17,200,000.00</div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-slate-800 text-slate-500 sticky top-0 uppercase border-b border-slate-700">
                <tr>
                  <th className="p-3 w-8"></th>
                  <th className="p-3">Loan ID</th>
                  <th className="p-3">Counterparty</th>
                  <th className="p-3">Sector</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Notional</th>
                  <th className="p-3 text-right">Yield</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {portfolio.map(loan => (
                  <tr 
                    key={loan.id} 
                    className={`hover:bg-slate-800/50 cursor-pointer transition ${selectedLoans.includes(loan.id) ? 'bg-blue-900/40 text-blue-100 ring-1 ring-blue-500/50' : ''}`}
                    onClick={() => toggleLoan(loan.id)}
                  >
                    <td className="p-3">
                      <div className={`w-3.5 h-3.5 border rounded-sm flex items-center justify-center transition-colors ${selectedLoans.includes(loan.id) ? 'bg-bloomberg-text border-bloomberg-text text-black' : 'border-slate-700 hover:border-slate-500'}`}>
                        {selectedLoans.includes(loan.id) && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                    </td>
                    <td className="p-3 font-bold text-blue-400">{loan.id}</td>
                    <td className="p-3 text-white">{loan.company}</td>
                    <td className="p-3 text-slate-500">{loan.sector}</td>
                    <td className="p-3">
                      <span className={`px-1.5 py-0.5 rounded-sm font-bold ${loan.rating.startsWith('A') ? 'bg-green-900/50 text-green-400 border border-green-800/50' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-800/50'}`}>
                        {loan.rating}
                      </span>
                    </td>
                    <td className="p-3 text-right text-white font-mono">${loan.amount.toLocaleString()}.00</td>
                    <td className="p-3 text-right text-bloomberg-text font-bold">{loan.yield.toFixed(2)}%</td>
                    <td className="p-3 text-[10px] text-emerald-500 uppercase font-bold tracking-tighter animate-pulse">Available</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-96 bg-black/40 flex flex-col border-l border-slate-800">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Trade Construction</h3>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
             {selectedLoans.length > 0 ? (
               <div className="space-y-8 animate-in fade-in duration-300">
                 <div>
                   <label className="text-[10px] text-slate-500 uppercase tracking-widest">Selected Notional</label>
                   <div className="text-2xl font-bold text-white font-mono mt-1">${totalSelectedValue.toLocaleString()}.00</div>
                   <div className="text-[10px] text-blue-400 mt-2 flex items-center">
                     <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                     {selectedLoans.length} LOANS AGGREGATED
                   </div>
                 </div>

                 <div className="bg-slate-800/80 p-5 rounded border border-slate-700">
                    <label className="text-[10px] text-slate-400 uppercase flex justify-between font-bold">
                      <span>Fractional Slice</span>
                      <span className="text-bloomberg-text">{sliceAmount}%</span>
                    </label>
                    <input 
                      type="range" 
                      min="5" max="95" step="5"
                      value={sliceAmount} 
                      onChange={(e) => setSliceAmount(parseInt(e.target.value))}
                      className="w-full mt-4 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-bloomberg-text"
                    />
                    <div className="flex justify-between mt-3 text-[9px] text-slate-500 uppercase font-bold">
                       <span>Retain Risk</span>
                       <span>Sell Risk</span>
                    </div>
                 </div>

                 <div className="h-44 relative bg-slate-800/30 rounded border border-slate-800/50">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={chartData}
                         innerRadius={45}
                         outerRadius={65}
                         paddingAngle={8}
                         dataKey="value"
                         stroke="none"
                       >
                         <Cell fill="#1e293b" />
                         <Cell fill="#ff9900" />
                       </Pie>
                       <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #334155', borderRadius: '2px', fontSize: '10px'}} />
                     </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                         <div className="text-[9px] text-slate-500 uppercase">Offering</div>
                         <div className="text-lg font-bold text-bloomberg-text font-mono">${((totalSelectedValue * sliceAmount) / 100).toLocaleString()}</div>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t border-slate-800">
                   <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 font-bold">DATA ROOM STATUS</span>
                      <span className="text-emerald-500">READY</span>
                   </div>
                   <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 font-bold">SETTLEMENT</span>
                      <span className="text-white">T+2 // USD</span>
                   </div>
                 </div>

                 <button 
                  onClick={generateDeal}
                  disabled={isConfirming}
                  className="w-full bg-bloomberg-text text-black font-bold py-4 rounded-sm uppercase text-xs hover:bg-orange-400 transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-50"
                 >
                   {isConfirming ? 'EXECUTING TRADE...' : 'Generate Deal Sheet'}
                 </button>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-700 space-y-4 text-center">
                 <div className="w-16 h-16 border-2 border-dashed border-slate-800 rounded-full flex items-center justify-center opacity-30">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                 </div>
                 <p className="text-[10px] uppercase font-bold tracking-widest">Select loans from inventory<br/>to begin construction</p>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Transaction Success Overlay */}
      {txId && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-500">
          <div className="bg-slate-900 border border-emerald-500/30 p-8 rounded-lg max-w-md w-full shadow-[0_0_50px_rgba(16,185,129,0.1)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h4 className="text-white text-lg font-bold uppercase tracking-widest mb-2">Deal Sheet Generated</h4>
            <p className="text-slate-400 text-xs mb-6">Market offering live. Counterparty documentation package finalized.</p>
            <div className="bg-black/50 p-3 rounded font-mono text-[10px] text-emerald-400 mb-8 border border-emerald-900/30">
              HASH: {txId}
            </div>
            <button 
              onClick={() => setTxId(null)}
              className="w-full bg-slate-800 text-white font-bold py-3 rounded text-[10px] uppercase tracking-widest hover:bg-slate-700"
            >
              Return to Terminal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrasshopperTrader;
