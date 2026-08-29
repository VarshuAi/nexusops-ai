import React from 'react';
import { Bot, CheckCircle2, ShieldCheck, Cpu, Sparkles, RefreshCw, GitBranch } from 'lucide-react';
import { useNexusStore } from '../../store/useNexusStore';

export const Header: React.FC = () => {
  const { 
    isPipelineRunning, 
    runPipeline, 
    isPatchApplied, 
    patchResult,
    applyPatch
  } = useNexusStore();

  return (
    <header className="glass-header sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b border-slate-800/80">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0d131f] rounded-[11px] flex items-center justify-center">
              <Bot className="w-4.5 h-4.5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                NexusOps <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-indigo-300 font-mono">v2.5</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous Multi-Agent DevOps & Code Intelligence</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs font-mono">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            5 Agents Consensus
          </span>
          <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900/60 text-slate-400 border border-slate-800/60 text-[11px]">
            <Cpu className="w-3 h-3 text-cyan-400" />
            DeepSeek-R1 / Sonnet 3.7
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {patchResult && !isPatchApplied && (
          <button
            onClick={applyPatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all shadow-sm shadow-emerald-950"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Apply Auto-Patch (+{patchResult.diffSummary.additions}/-{patchResult.diffSummary.deletions})
          </button>
        )}

        {isPatchApplied && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Hardened Patch Active
          </span>
        )}

        <button
          onClick={() => runPipeline()}
          disabled={isPipelineRunning}
          className={`relative group overflow-hidden flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-md ${
            isPipelineRunning
              ? 'bg-indigo-950 text-indigo-300 border border-indigo-700/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40'
          }`}
        >
          {isPipelineRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              Executing Agents...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              Run Multi-Agent Audit
            </>
          )}
        </button>

        <a
          href="https://github.com/VarshuAi/nexusops-ai"
          target="_blank"
          rel="noreferrer"
          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="GitHub Repository"
        >
          <GitBranch className="w-4 h-4" />
        </a>
      </div>
    </header>
  );
};
