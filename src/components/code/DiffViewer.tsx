import React, { useState } from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { GitPullRequest, CheckCircle2, Copy, Check, Sparkles, ArrowRight, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DiffViewer: React.FC = () => {
  const { 
    patchResult, 
    applyPatch, 
    isPatchApplied, 
    revertPatch, 
    runPipeline, 
    isPipelineRunning,
    code,
    language 
  } = useNexusStore();

  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');

  const handleApply = () => {
    applyPatch();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyDiff = () => {
    if (!patchResult) return;
    const diffText = `--- a/${patchResult.filename}\n+++ b/${patchResult.filename}\n${patchResult.chunks.map(c => 
      `@@ -${c.oldStart},${c.oldLines} +${c.newStart},${c.newLines} @@\n` + 
      c.lines.map(l => (l.type === 'add' ? '+' : l.type === 'delete' ? '-' : ' ') + l.content).join('\n')
    ).join('\n')}`;

    navigator.clipboard.writeText(diffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!patchResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#080c16]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-950">
          <GitPullRequest className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-2">No Synthesized Patch Available</h3>
        <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
          Run the multi-agent consensus pipeline to analyze vulnerabilities, generate test suites, and compile a zero-regression patch.
        </p>
        <button
          onClick={() => runPipeline()}
          disabled={isPipelineRunning}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-medium text-xs shadow-lg shadow-indigo-500/25 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Run Multi-Agent Audit & Generate Patch
        </button>
      </div>
    );
  }

  const oldLines = patchResult.originalCode.split('\n');
  const newLines = patchResult.patchedCode.split('\n');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-hidden">
      <div className="px-6 py-3.5 border-b border-slate-800/80 bg-[#0d121f] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
            <GitPullRequest className="w-4 h-4 text-emerald-400" />
            <span>{patchResult.filename}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
              +{patchResult.diffSummary.additions} lines
            </span>
            <span className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-semibold">
              -{patchResult.diffSummary.deletions} lines
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('unified')}
              className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'unified' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Unified Patch
            </button>
          </div>

          <button
            onClick={handleCopyDiff}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy .diff'}
          </button>

          {!isPatchApplied ? (
            <button
              onClick={handleApply}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md shadow-emerald-950 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Apply Patch to Workspace
            </button>
          ) : (
            <button
              onClick={revertPatch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-all"
            >
              Revert Patch
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 font-mono text-xs">
        {viewMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-xl border border-rose-950/60 bg-[#0c101b] overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-900/30 text-rose-300 font-semibold flex items-center justify-between">
                <span>Original (Vulnerable / Inefficient)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/60 text-rose-300 font-mono">Before</span>
              </div>
              <div className="p-4 overflow-x-auto space-y-1">
                {oldLines.map((line, idx) => (
                  <div key={idx} className="flex gap-3 leading-6 hover:bg-rose-950/20 px-2 rounded">
                    <span className="w-8 text-right text-slate-600 select-none">{idx + 1}</span>
                    <span className="text-slate-300 whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-emerald-950/60 bg-[#0c101b] overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-emerald-950/40 border-b border-emerald-900/30 text-emerald-300 font-semibold flex items-center justify-between">
                <span>Autonomous Multi-Agent Patch</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono">Hardened & Fixed</span>
              </div>
              <div className="p-4 overflow-x-auto space-y-1">
                {newLines.map((line, idx) => (
                  <div key={idx} className="flex gap-3 leading-6 hover:bg-emerald-950/20 px-2 rounded">
                    <span className="w-8 text-right text-slate-600 select-none">{idx + 1}</span>
                    <span className="text-emerald-200 whitespace-pre">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-800 bg-[#0c101b] overflow-hidden p-4">
            <div className="space-y-0.5">
              {patchResult.chunks[0]?.lines.map((l, i) => (
                <div 
                  key={i} 
                  className={`flex gap-3 px-2 py-0.5 rounded leading-6 ${
                    l.type === 'add' ? 'bg-emerald-950/50 text-emerald-300' :
                    l.type === 'delete' ? 'bg-rose-950/50 text-rose-300' : 'text-slate-400'
                  }`}
                >
                  <span className="w-6 text-slate-600 select-none font-bold">
                    {l.type === 'add' ? '+' : l.type === 'delete' ? '-' : ' '}
                  </span>
                  <span className="whitespace-pre font-mono">{l.content}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Generated Pull Request Description</span>
          </div>
          <p className="text-xs text-indigo-300 font-mono font-semibold">{patchResult.prTitle}</p>
          <pre className="p-3 rounded-lg bg-[#090d18] border border-slate-800 text-[11px] text-slate-300 whitespace-pre-wrap font-mono">
            {patchResult.prDescription}
          </pre>
        </div>
      </div>
    </div>
  );
};
