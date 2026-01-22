
import React, { useState, useCallback } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  Mic, 
  Upload, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  ClipboardCopy,
  Calendar,
  Building2,
  Users,
  Mail,
  Globe
} from 'lucide-react';
import { AnalysisReport, InputMode } from './types';
import { analyzeHealthTechInput } from './services/gemini';
import ReadinessChart from './components/ReadinessChart';

const App: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'processing' | 'report'>('landing');
  const [inputMode, setInputMode] = useState<InputMode | null>(null);
  const [inputText, setInputText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loadingMessage, setLoadingMessage] = useState('Initializing Executive Listener...');
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [leadInfo, setLeadInfo] = useState({ name: '', country: '', size: '', email: '' });
  const [isCopied, setIsCopied] = useState(false);

  const handleStartAnalysis = async () => {
    setStep('processing');
    const inputs = [];
    if (inputText) inputs.push({ type: 'text', data: inputText });
    files.forEach(f => inputs.push({ type: 'file', data: f }));

    try {
      setLoadingMessage('Agent 1: Listening to leadership concerns...');
      // Simulated delay for "agent orchestration" feel
      setTimeout(() => setLoadingMessage('Agent 2: Mining workflows for bottlenecks...'), 1500);
      setTimeout(() => setLoadingMessage('Agent 4: Selecting top-tier tool stack...'), 3000);
      setTimeout(() => setLoadingMessage('Agent 7: Preparing consultant handoff...'), 4500);

      const result = await analyzeHealthTechInput(inputs);
      setReport(result);
      setStep('report');
    } catch (error) {
      console.error(error);
      alert('Analysis failed. Please try again.');
      setStep('landing');
    }
  };

  const copyBrief = () => {
    if (report) {
      navigator.clipboard.writeText(report.consultantBrief);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold tracking-tight text-slate-800">HealthTech Strategist</span>
          </div>
          {step === 'report' && (
            <button 
              onClick={() => setStep('landing')}
              className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              Start New Assessment
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {step === 'landing' && (
          <div className="max-w-4xl mx-auto space-y-12 py-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Modernize Your Care Delivery</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Turn your administrative frustrations into a HIPAA-safe AI modernization roadmap. 
                Beginner-friendly. Executive-focused. No IT team required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setInputMode('text')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-start text-left gap-4 hover:shadow-lg ${inputMode === 'text' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
              >
                <FileText className="w-10 h-10 text-blue-600" />
                <div>
                  <h3 className="font-bold text-lg">Paste Leadership Notes</h3>
                  <p className="text-sm text-slate-500">Unstructured thoughts, frustrations, or goals.</p>
                </div>
              </button>
              <button 
                onClick={() => setInputMode('upload')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-start text-left gap-4 hover:shadow-lg ${inputMode === 'upload' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
              >
                <Upload className="w-10 h-10 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-lg">Upload Documents</h3>
                  <p className="text-sm text-slate-500">SOPs, intake forms, screenshots, or policies.</p>
                </div>
              </button>
              <button 
                onClick={() => setInputMode('voice')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-start text-left gap-4 hover:shadow-lg ${inputMode === 'voice' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
              >
                <Mic className="w-10 h-10 text-orange-600" />
                <div>
                  <h3 className="font-bold text-lg">Speak Your Situation</h3>
                  <p className="text-sm text-slate-500">Dictate your current workflow bottlenecks.</p>
                </div>
              </button>
              <button 
                onClick={() => setInputMode('video')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-start text-left gap-4 hover:shadow-lg ${inputMode === 'video' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
              >
                <Video className="w-10 h-10 text-purple-600" />
                <div>
                  <h3 className="font-bold text-lg">Walkthrough Video</h3>
                  <p className="text-sm text-slate-500">Show us how you currently handle documentation.</p>
                </div>
              </button>
            </div>

            {inputMode && (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  {inputMode === 'text' && (
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="e.g., Our intake process is slow, nurses are spending 3 hours a day on notes..."
                      className="w-full h-48 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg resize-none"
                    />
                  )}
                  {(inputMode === 'upload' || inputMode === 'video' || inputMode === 'voice') && (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-12 bg-slate-50">
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        id="file-upload"
                        onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                        <div className="bg-white p-4 rounded-full shadow-sm">
                          <Upload className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Click to select files</p>
                          <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG, or MP4 supported</p>
                        </div>
                      </label>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {files.map((f, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{f.name}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={handleStartAnalysis}
                    className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors group"
                  >
                    Generate Modernization Roadmap
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'processing' && (
          <div className="max-w-xl mx-auto py-32 text-center space-y-8">
            <div className="relative inline-block">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
              <Activity className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">Orchestrating Multi-Agent Analysis</h2>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto">
                <div className="h-full bg-blue-600 animate-[loading_8s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
              </div>
              <p className="text-slate-500 italic">"{loadingMessage}"</p>
            </div>
            <style>{`
              @keyframes loading {
                0% { width: 0% }
                100% { width: 100% }
              }
            `}</style>
          </div>
        )}

        {step === 'report' && report && (
          <div className="space-y-12 max-w-5xl mx-auto pb-24">
            {/* Report Header */}
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-400/30">
                    Modernization Blueprint
                  </span>
                  <span className="text-slate-400 text-xs">{new Date().toLocaleDateString()}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black">AI & Cloud Readiness Report</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <h3 className="text-blue-400 font-bold uppercase text-sm tracking-wide">Executive Summary</h3>
                    <ul className="space-y-2">
                      {report.executiveSummary.map((item, i) => (
                        <li key={i} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-blue-400 font-bold uppercase text-sm tracking-wide">Primary Assessment</h3>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                      <ReadinessChart data={report.readinessScores} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full -mr-20 -mt-20"></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Pain Points & Quick Wins */}
              <div className="md:col-span-4 space-y-8">
                <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-500" />
                    Detected Pain Points
                  </h3>
                  <div className="space-y-4">
                    {report.painPoints.map((point, i) => (
                      <div key={i} className="flex gap-3 items-start group">
                        <span className="bg-slate-100 text-slate-500 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold group-hover:bg-red-100 group-hover:text-red-600 transition-colors">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600 leading-tight">{point}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-emerald-800">
                    <ArrowRight className="w-5 h-5" />
                    Quick Wins
                  </h3>
                  <div className="space-y-3">
                    {report.quickWins.map((win, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl border border-emerald-200 flex gap-2 items-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-slate-700">{win}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4">Governance Checklist</h3>
                  <div className="space-y-2">
                    {report.governanceChecklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-4 h-4 border-2 border-slate-300 rounded" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] text-slate-400 leading-tight">
                    * Note: Leadership must implement access control, audit logs, data retention policies, and training for HIPAA eligibility.
                  </p>
                </section>
              </div>

              {/* Center Column: Tools & Roadmap */}
              <div className="md:col-span-8 space-y-8">
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Top 10 HIPAA-Eligible Stack</h2>
                    <span className="text-xs font-bold text-slate-400">AWS + MICROSOFT + GOOGLE</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {report.toolStack.map((tool, i) => (
                      <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 transition-all shadow-sm group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{tool.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            tool.difficulty === 'Low' ? 'bg-green-100 text-green-700' : 
                            tool.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            {tool.difficulty} Lift
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{tool.description}</p>
                        <div className="space-y-1.5 border-t border-slate-100 pt-3">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">Best for:</span>
                            <span className="font-medium text-slate-700">{tool.bestFor}</span>
                          </div>
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-400">Integration:</span>
                            <span className="font-medium text-slate-700">{tool.integration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900">30–60–90 Day Roadmap</h2>
                  <div className="space-y-4">
                    {report.roadmap.map((phase, i) => (
                      <div key={i} className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                          <span className="font-bold text-slate-700">{phase.phase}</span>
                          <div className="flex -space-x-2">
                            {phase.roles.map((r, ri) => (
                              <div key={ri} title={r} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-blue-600 uppercase">
                                {r.substring(0, 2)}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-3">
                            {phase.steps.map((step, si) => (
                              <li key={si} className="flex gap-3 text-sm text-slate-600 items-start">
                                <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Lead Capture & Handoff */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-50 p-8 md:p-12 rounded-[2.5rem] border border-blue-100">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-blue-900 leading-tight">Secure Your Implementation Support</h2>
                <p className="text-blue-800/80">
                  Ready to move from strategy to installation? Provide your details to book a follow-up assessment with our consultant, Hiwot.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-blue-900/60 uppercase ml-1">Org Name</label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                        <input 
                          type="text" 
                          value={leadInfo.name}
                          onChange={(e) => setLeadInfo({...leadInfo, name: e.target.value})}
                          className="w-full bg-white border border-blue-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="e.g. Hope Health" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-blue-900/60 uppercase ml-1">Country</label>
                      <div className="relative">
                        <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                        <input 
                          type="text" 
                          value={leadInfo.country}
                          onChange={(e) => setLeadInfo({...leadInfo, country: e.target.value})}
                          className="w-full bg-white border border-blue-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="USA" 
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-blue-900/60 uppercase ml-1">Staff Size</label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                        <input 
                          type="text" 
                          value={leadInfo.size}
                          onChange={(e) => setLeadInfo({...leadInfo, size: e.target.value})}
                          className="w-full bg-white border border-blue-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="50-100" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-blue-900/60 uppercase ml-1">Contact Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                        <input 
                          type="email" 
                          value={leadInfo.email}
                          onChange={(e) => setLeadInfo({...leadInfo, email: e.target.value})}
                          className="w-full bg-white border border-blue-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                          placeholder="exec@org.com" 
                        />
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                    <Calendar className="w-5 h-5" />
                    Book 30-min Assessment Call
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Consultant Brief (For Hiwot)</h3>
                  <button 
                    onClick={copyBrief}
                    className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800"
                  >
                    {isCopied ? <CheckCircle2 className="w-3 h-3" /> : <ClipboardCopy className="w-3 h-3" />}
                    {isCopied ? 'Copied' : 'Copy Brief'}
                  </button>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-blue-200 shadow-sm h-full max-h-[300px] overflow-y-auto">
                  <pre className="text-[10px] text-slate-500 whitespace-pre-wrap font-mono leading-relaxed">
                    {report.consultantBrief}
                    {`\n\nLEAD DETAILS:\nOrg: ${leadInfo.name || 'N/A'}\nCountry: ${leadInfo.country || 'N/A'}\nSize: ${leadInfo.size || 'N/A'}\nContact: ${leadInfo.email || 'N/A'}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} HealthTech Strategist. Administrative Support System Only.</p>
          <p className="text-[10px] text-slate-400 max-w-xl mx-auto">
            Disclaimer: This system provides drafts and recommendations for administrative support. No clinical advice provided. 
            All tools are HIPAA-eligible only when used under a Business Associate Agreement (BAA) and configured correctly.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
