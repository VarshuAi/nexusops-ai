import React, { useState, useEffect, useRef } from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { Terminal, Trash2, Copy, Check } from 'lucide-react';

export const LiveLogStream: React.FC = () => {
  const { logs, clearLogs, isPipelineRunning } = useNexusStore();
  const [filter, setFilter] = useState<'all' | 'info' | 'debug' | 'success'>('all');
  const [copied, setCopied] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.level === filter;
  });

  const handleCopyLogs = () => {
    const text = logs.map(l => `[${l.timestamp}] [${l.agentName}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-[#090d18] overflow-hidden flex flex-col h-72">
      <div className="px-4 py-2.5 bg-[#0d1322] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Real-Time Agent Telemetry Stream</span>
          {isPipelineRunning && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded bg-slate-900 border border-slate-800 text-[10px] font-mono">
            {(['all', 'info', 'debug', 'success'] as const).map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilter(lvl)}
                className={`px-2 py-0.5 uppercase transition-colors ${filter === lvl ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyLogs}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy all logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={clearLogs}
            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3 font-mono text-xs space-y-1 select-text">
        {filteredLogs.length === 0 ? (
          <div className="text-slate-600 italic text-[11px] py-4 text-center">
            No telemetry stream events captured yet. Click "Run Multi-Agent Audit" to start execution.
          </div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className="flex items-start gap-2 leading-5">
              <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase select-none ${
                log.level === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                log.level === 'warn' ? 'bg-amber-950 text-amber-400' :
                log.level === 'error' ? 'bg-rose-950 text-rose-400' :
                log.level === 'debug' ? 'bg-cyan-950 text-cyan-400' : 'bg-slate-800 text-indigo-300'
              }`}>
                {log.agentName}
              </span>
              <span className={`text-slate-300 ${log.level === 'success' ? 'text-emerald-300 font-semibold' : ''}`}>
                {log.message}
              </span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};
