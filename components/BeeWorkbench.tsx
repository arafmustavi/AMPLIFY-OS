
import React, { useState } from 'react';
import { generateCreditMemo } from '../services/geminiService';
import { DocumentFile } from '../types';

const BeeWorkbench: React.FC = () => {
  const [files, setFiles] = useState<DocumentFile[]>([
    { id: '1', name: 'FY23_Tax_Returns.pdf', type: 'application/pdf', size: '2.4 MB', status: 'complete' },
    { id: '2', name: 'Bank_Statements_Q3.pdf', type: 'application/pdf', size: '4.1 MB', status: 'pending' },
    { id: '3', name: 'Inc_Certificate.pdf', type: 'application/pdf', size: '0.8 MB', status: 'pending' },
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>('1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [generatedMemo, setGeneratedMemo] = useState<string>('');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const newFile: DocumentFile = {
      id,
      name: 'Uploaded_Document.pdf',
      type: 'application/pdf',
      size: '1.2 MB',
      status: 'pending'
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const runAnalysis = async () => {
    if (!activeDoc) return;
    setIsAnalyzing(true);
    const doc = files.find(f => f.id === activeDoc);
    
    const mockContent = `
      COMPANY: ACME Construction LLC
      EIN: 12-3456789
      TOTAL REVENUE: $4,500,000
      NET INCOME: $650,000
      DEPRECIATION: $120,000
      INTEREST EXPENSE: $45,000
      NOTES: The company saw a 15% increase in revenue YoY. However, material costs rose by 8%.
      Litigation: No active lawsuits found.
    `;

    const result = await generateCreditMemo(doc?.name || 'Unknown Doc', mockContent);
    setGeneratedMemo(result);
    setIsAnalyzing(false);
    
    setFiles(prev => prev.map(f => f.id === activeDoc ? { ...f, status: 'complete' } : f));
  };

  const downloadMemo = () => {
    if (!generatedMemo) return;
    const element = document.createElement("a");
    const file = new Blob([generatedMemo], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `CREDIT_MEMO_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white">
        <div>
           <h2 className="text-lg font-bold text-slate-800 flex items-center">
             <span className="text-amber-500 mr-2">●</span>
             The BEE Workbench
           </h2>
           <p className="text-xs text-slate-500">Intelligent Document Processing & Extraction</p>
        </div>
        <button 
          onClick={downloadMemo}
          disabled={!generatedMemo}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !generatedMemo 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md active:scale-95'
          }`}
        >
          Export Credit Memo
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col">
          <div 
            className="m-4 p-8 border-2 border-dashed border-slate-300 rounded-lg text-center cursor-pointer hover:bg-slate-100 transition group"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <svg className="w-8 h-8 mx-auto text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="text-sm text-slate-600 font-medium">Drag loan docs here</p>
            <p className="text-xs text-slate-400 mt-1">PDF, JPG, MSG</p>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 px-1">Workspace Files</h3>
            {files.map(file => (
              <div 
                key={file.id}
                onClick={() => setActiveDoc(file.id)}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  activeDoc === file.id 
                    ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${activeDoc === file.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">{file.size}</p>
                  </div>
                </div>
                {file.status === 'complete' && (
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
             <h3 className="font-semibold text-slate-700 text-sm">Extraction Results</h3>
             <button 
               onClick={runAnalysis}
               disabled={isAnalyzing}
               className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                 isAnalyzing ? 'bg-slate-200 text-slate-500' : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95'
               }`}
             >
               {isAnalyzing ? (
                 <>
                   <svg className="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                   <span>Neural Extraction Engine...</span>
                 </>
               ) : (
                 <>
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                   <span>Re-Analyze</span>
                 </>
               )}
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
             {generatedMemo ? (
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm font-serif">
                   {generatedMemo.split('\n').map((line, i) => {
                     if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold mb-6 text-slate-900 border-b pb-4">{line.replace('# ', '')}</h1>;
                     if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-8 mb-4 text-slate-800">{line.replace('## ', '')}</h2>;
                     if (line.startsWith('* ')) return <li key={i} className="ml-4 mb-2 text-slate-700 list-disc">{line.replace('* ', '')}</li>;
                     if (line.trim() === '---') return <hr key={i} className="my-8 border-slate-200" />;
                     return <p key={i} className={`mb-3 text-slate-700 leading-relaxed ${line.startsWith('**') ? 'font-bold bg-yellow-50 inline-block px-1' : ''}`}>{line.replace(/\*\*/g, '')}</p>;
                   })}
                 </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                    <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                 </div>
                 <div className="text-center">
                   <p className="font-semibold text-slate-600">No Document Data Loaded</p>
                   <p className="text-sm">Select a source file and trigger Neural Extraction</p>
                 </div>
               </div>
             )}
          </div>
          
          <div className="p-4 bg-orange-50 border-t border-orange-100 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-orange-700 font-medium">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
               <span>Policy Check: DSCR (1.21x) Threshold Alert</span>
            </div>
            <div className="text-[10px] uppercase font-bold text-orange-400 tracking-widest animate-pulse">Compliance Override Required</div>
          </div>
        </div>

        <div className="w-1/3 bg-slate-900 border-l border-slate-800 flex flex-col hidden lg:flex">
           <div className="p-3 bg-black/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest flex justify-between items-center">
             <span>SECURE-VIEWER://v3.1</span>
             <span>PG 1/4</span>
           </div>
           <div className="flex-1 p-6 flex items-center justify-center overflow-hidden">
             <div className="bg-white/95 h-[80%] w-[90%] rounded-sm shadow-2xl p-10 transform rotate-1 scale-95 origin-center text-[8px] text-slate-400 overflow-hidden leading-relaxed select-none border border-white">
                <div className="w-full h-8 bg-slate-200/50 mb-6"></div>
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2 h-4 bg-slate-100/50 rounded"></div>
                  <div className="w-1/2 h-4 bg-slate-100/50 rounded"></div>
                </div>
                {Array.from({length: 40}).map((_, i) => (
                  <div key={i} className="w-full h-1.5 bg-slate-50 mb-2 rounded" style={{width: `${Math.random() * 40 + 60}%`}}></div>
                ))}
                <div className="absolute top-[20%] left-10 right-10 h-10 border-2 border-yellow-400/50 bg-yellow-400/5 rounded"></div>
             </div>
           </div>
           <div className="p-4 border-t border-slate-800 flex space-x-2">
             <button className="flex-1 py-2 text-xs font-bold bg-slate-800 text-slate-400 rounded hover:bg-slate-700 transition">ANNOTATE</button>
             <button className="flex-1 py-2 text-xs font-bold bg-slate-800 text-slate-400 rounded hover:bg-slate-700 transition">VERSION Hx</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BeeWorkbench;
