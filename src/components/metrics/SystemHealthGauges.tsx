import React from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { Activity, Shield, Zap, CheckCircle2, TrendingUp, Cpu, Flame, Layers } from 'lucide-react';
import { getScoreColor } from '../../utils/formatters';

export const SystemHealthGauges: React.FC = () => {
  const { metrics, executionSummary, isPatchApplied, patchResult } = useNexusStore();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-y-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Security Health</span>
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-3">
            <div className={`text-3xl font-extrabold font-mono ${getScoreColor(metrics.securityScore)}`}>
              {metrics.securityScore}<span className="text-sm font-normal text-slate-500">/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {metrics.securityScore > 80 ? 'Grade: A+ (Hardened)' : 'Vulnerable (Action Required)'}
            </p>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-400 h-full transition-all duration-500"
              style={{ width: `${metrics.securityScore}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Maintainability Index</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold font-mono text-indigo-300">
              {metrics.maintainabilityIndex}<span className="text-sm font-normal text-slate-500">/100</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Halstead Complexity Formula</p>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-500"
              style={{ width: `${metrics.maintainabilityIndex}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Branch Coverage</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold font-mono text-emerald-300">
              {metrics.estimatedTestCoverage}%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Adversarial Matrix Generated</p>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full transition-all duration-500"
              style={{ width: `${metrics.estimatedTestCoverage}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Cyclomatic Complexity</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold font-mono text-amber-300">
              {metrics.cyclomaticComplexity}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Independent Execution Paths</p>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, metrics.cyclomaticComplexity * 8)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#0c1120] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            Runtime Performance Optimization Projection
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Estimated Throughput</span>
              <span className="text-emerald-400 font-bold">~4,500 req/sec</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Latency Reduction</span>
              <span className="text-cyan-400 font-bold">-68% (p99 latency)</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
              <span className="text-slate-400">Memory Footprint Delta</span>
              <span className="text-indigo-300 font-bold">-142 MB RAM</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c1120] border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-400" />
            Consensus Multi-Agent Execution Benchmark
          </h3>
          {executionSummary ? (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Pipeline Duration</span>
                <span className="text-slate-200">{executionSummary.totalDurationMs} ms</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Total Tokens Processed</span>
                <span className="text-indigo-400 font-bold">{executionSummary.totalTokens} tokens</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Estimated LLM Cost</span>
                <span className="text-emerald-400 font-bold">${executionSummary.costEstimatedUsd} USD</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic py-6 text-center">
              Run the agent pipeline to calculate execution metrics and LLM token telemetry.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
