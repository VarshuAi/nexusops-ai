import React from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { BENCHMARK_SNIPPETS } from '../../data/benchmarkSnippets';
import { FileCode, Play, RotateCcw, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

export const CodeWorkspace: React.FC = () => {
  const { 
    code, 
    setCode, 
    filename, 
    language, 
    selectedSnippetId, 
    loadSnippet, 
    runPipeline, 
    isPipelineRunning,
    vulnerabilities,
    resetWorkspace,
    isPatchApplied
  } = useNexusStore();

  const lines = code.split('\n');
  const openVulns = vulnerabilities.filter(v => v.status === 'OPEN');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-hidden">
      <div className="px-6 py-3 border-b border-slate-800/80 bg-[#0d121f] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>{filename}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold uppercase">
              {language}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-medium">Load Benchmark:</label>
            <select
              value={selectedSnippetId}
              onChange={(e) => loadSnippet(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
            >
              {BENCHMARK_SNIPPETS.map((snippet) => (
                <option key={snippet.id} value={snippet.id}>
                  {snippet.category}: {snippet.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {openVulns.length > 0 && !isPatchApplied ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>{openVulns.length} Issues Detected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Clean Code / Verified</span>
            </div>
          )}

          <button
            onClick={resetWorkspace}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition-colors"
            title="Reset code to original"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden font-mono text-xs">
        <div className="w-12 bg-[#090d18] border-r border-slate-800/80 py-4 select-none text-right pr-3 text-slate-600 font-mono">
          {lines.map((_, idx) => (
            <div key={idx} className="leading-6">
              {idx + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 relative bg-[#080c16]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-full p-4 bg-transparent text-slate-200 font-mono resize-none focus:outline-none leading-6 selection:bg-indigo-500/30 selection:text-indigo-200"
            placeholder="Paste code or choose a benchmark snippet above..."
          />
        </div>
      </div>
    </div>
  );
};
