import React from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { LiveLogStream } from './LiveLogStream';
import { ArrowRight, Bot, Cpu, CheckCircle2, Clock, Sparkles, RefreshCw } from 'lucide-react';

export const AgentPipelineCanvas: React.FC = () => {
  const { 
    agents, 
    agentStatuses, 
    agentResults, 
    activeAgentId, 
    isPipelineRunning, 
    runPipeline 
  } = useNexusStore();

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-auto p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0e1424] to-cyan-950/40 border border-indigo-500/20 shadow-xl">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Autonomous Multi-Agent Execution Graph (DAG)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Agents execute in parallel AST consensus mode to audit security, architecture, performance, author tests, and synthesize zero-regression patches.
          </p>
        </div>

        <button
          onClick={() => runPipeline()}
          disabled={isPipelineRunning}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
        >
          {isPipelineRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Running Multi-Agent DAG...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Execute Pipeline Graph
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {agents.map((agent, index) => {
          const status = agentStatuses[agent.id] || 'IDLE';
          const result = agentResults[agent.id];
          const isActive = activeAgentId === agent.id;

          return (
            <div
              key={agent.id}
              className={`relative rounded-xl p-4 transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-indigo-950/60 border-2 border-indigo-400 shadow-lg shadow-indigo-500/30 scale-[1.02]'
                  : status === 'COMPLETED'
                  ? 'bg-[#0d1424] border border-emerald-500/40 shadow-sm shadow-emerald-950'
                  : 'bg-[#0b0f1b] border border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    Node #{index + 1}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                    status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    isActive ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' :
                    'bg-slate-800 text-slate-500'
                  }`}>
                    {isActive ? 'ANALYZING' : status}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="text-2xl p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {agent.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">{agent.name}</h4>
                    <p className="text-[10px] font-mono text-slate-400">{agent.codename}</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                  {agent.systemPrompt}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Confidence:</span>
                  <span className="text-indigo-300 font-bold">
                    {result ? `${Math.round(result.confidenceScore * 100)}%` : '---'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tokens:</span>
                  <span className="text-slate-300">{result ? result.tokensUsed.total : '---'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <LiveLogStream />
    </div>
  );
};
