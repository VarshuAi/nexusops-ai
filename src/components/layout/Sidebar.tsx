import React from 'react';
import { 
  Code2, 
  GitPullRequest, 
  ShieldAlert, 
  Activity, 
  Users, 
  FlaskConical, 
  Layers, 
  Sparkles,
  Cpu
} from 'lucide-react';
import { useNexusStore, ActiveTab } from '../../store/useNexusStore';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, vulnerabilities, patchResult, isPipelineRunning } = useNexusStore();

  const openVulnsCount = vulnerabilities.filter(v => v.status === 'OPEN').length;

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string }> = [
    {
      id: 'WORKSPACE',
      label: 'Code Editor',
      icon: <Code2 className="w-4 h-4" />
    },
    {
      id: 'PIPELINE',
      label: 'Agent Pipeline DAG',
      icon: <Layers className="w-4 h-4" />,
      badge: isPipelineRunning ? 'LIVE' : undefined,
      badgeColor: 'bg-indigo-500 text-white animate-pulse'
    },
    {
      id: 'DIFF',
      label: 'Unified Diff & Patch',
      icon: <GitPullRequest className="w-4 h-4" />,
      badge: patchResult ? `+${patchResult.diffSummary.additions}` : undefined,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'SECURITY',
      label: 'Security & CVEs',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: openVulnsCount > 0 ? openVulnsCount : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
    },
    {
      id: 'METRICS',
      label: 'Metrics & Health',
      icon: <Activity className="w-4 h-4" />
    },
    {
      id: 'AGENTS',
      label: 'Agent Personas',
      icon: <Users className="w-4 h-4" />,
      badge: '5'
    },
    {
      id: 'TESTS',
      label: 'Automated QA Suite',
      icon: <FlaskConical className="w-4 h-4" />
    },
    {
      id: 'INTEGRATIONS',
      label: 'CI/CD & GitHub Export',
      icon: <Sparkles className="w-4 h-4" />
    }
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-[#0c101c]/90 flex flex-col justify-between shrink-0 p-3">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
          Autonomous Engines
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-950 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono font-medium ${item.badgeColor || 'bg-slate-800 text-slate-400'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-gradient-to-b from-slate-900/90 to-[#0d131f] border border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            Consensus Mode
          </span>
          <span className="font-mono text-indigo-300">Parallel AST</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          5 agents run in zero-regression consensus mode to compile verified patches.
        </p>
      </div>
    </aside>
  );
};
