import React, { useState } from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { Users, Plus, Shield, Settings2, Sliders, Check } from 'lucide-react';
import { AgentPersona } from '../../types/agent';

export const AgentPersonaBuilder: React.FC = () => {
  const { agents, toggleAgentEnabled, updateAgentPersona, addCustomAgent } = useNexusStore();
  const [editingAgent, setEditingAgent] = useState<AgentPersona | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-y-auto p-6 space-y-6">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0d1322] border border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            Autonomous Agent Personas & Consensus Roster
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure system prompts, LLM foundation models, temperature parameters, and role specializations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="p-5 rounded-2xl bg-[#0c101c] border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {agent.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{agent.name}</h3>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded border border-indigo-900/40">
                      {agent.codename}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleAgentEnabled(agent.id)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${agent.enabled ? 'bg-indigo-600' : 'bg-slate-800'}`}
                >
                  <span
                    className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${agent.enabled ? 'translate-x-4.5' : 'translate-x-1'}`}
                  />
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                  <span>Model:</span>
                  <span className="text-slate-200 font-medium">{agent.model}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                  <span>Temperature:</span>
                  <span className="text-cyan-400 font-bold">{agent.temperature}</span>
                </div>
              </div>

              <div className="mt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-1.5">Capabilities</h4>
                <div className="space-y-1">
                  {agent.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Execution Order: #{agent.executionOrder}</span>
              <span className={agent.enabled ? 'text-emerald-400' : 'text-slate-500'}>
                {agent.enabled ? 'Active' : 'Disabled'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
