import React from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { Terminal, Shield, CheckCircle, Zap, HardDrive } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { metrics, executionSummary, isPipelineRunning, activeAgentId, agents } = useNexusStore();

  const currentAgent = agents.find(a => a.id === activeAgentId);

  return (
    <footer className="glass-header px-6 py-2 border-t border-slate-800 text-xs flex items-center justify-between text-slate-400 font-mono">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {isPipelineRunning ? (
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Running: {currentAgent?.name || 'Multi-Agent Consensus'}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Pipeline Ready
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-800 text-slate-500 text-[11px]">
          <span>LOC: <strong className="text-slate-300">{metrics.linesOfCode}</strong></span>
          <span>Complexity: <strong className="text-slate-300">{metrics.cyclomaticComplexity}</strong></span>
          <span>Maintainability: <strong className="text-slate-300">{metrics.maintainabilityIndex}/100</strong></span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        {executionSummary && (
          <span className="text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">
            Tokens: {executionSummary.totalTokens} (~${executionSummary.costEstimatedUsd})
          </span>
        )}
        <span className="flex items-center gap-1 text-slate-400">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          Security Score: <span className="text-cyan-300 font-bold">{metrics.securityScore}/100</span>
        </span>
      </div>
    </footer>
  );
};
