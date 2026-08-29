import React, { useState } from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { ShieldAlert, ShieldCheck, Bug, ExternalLink, ChevronRight, AlertTriangle } from 'lucide-react';
import { getSeverityBg } from '../../utils/formatters';

export const SecurityMatrix: React.FC = () => {
  const { vulnerabilities, isPatchApplied, applyPatch } = useNexusStore();
  const [selectedVulnId, setSelectedVulnId] = useState<string | null>(vulnerabilities[0]?.id || null);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const selectedVuln = vulnerabilities.find(v => v.id === selectedVulnId) || vulnerabilities[0];

  const filteredVulns = vulnerabilities.filter(v => {
    if (filterSeverity === 'ALL') return true;
    return v.severity === filterSeverity;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 bg-[#0d121f] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            Security and Vulnerability Intelligence Center
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            OWASP Top 10, CWE matrix, CVSS 3.1 exploit vectors, and cryptographic flaw analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                filterSeverity === sev
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-slate-800 overflow-y-auto p-4 space-y-2.5">
          {filteredVulns.map(vuln => {
            const isSelected = selectedVuln?.id === vuln.id;
            return (
              <div
                key={vuln.id}
                onClick={() => setSelectedVulnId(vuln.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-md shadow-indigo-950'
                    : 'bg-[#0b0f1a] border-slate-800/80 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${getSeverityBg(vuln.severity)}`}>
                    {vuln.severity} | CVSS {vuln.cvssScore}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{vuln.cveOrCwe}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200 mb-1">{vuln.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{vuln.description}</p>
              </div>
            );
          })}
        </div>

        <div className="w-1/2 overflow-y-auto p-6 bg-[#090d18]">
          {selectedVuln ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono px-2.5 py-1 rounded border font-bold ${getSeverityBg(selectedVuln.severity)}`}>
                    {selectedVuln.severity} (CVSS {selectedVuln.cvssScore})
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/50">
                    {selectedVuln.cveOrCwe}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">{selectedVuln.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">Location: {selectedVuln.file}:{selectedVuln.lineRange[0]}-{selectedVuln.lineRange[1]}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Vulnerability Description</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedVuln.description}</p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 font-mono">Impact and Threat Scenario</h4>
                <p className="text-xs text-rose-200/90 leading-relaxed">{selectedVuln.impact}</p>
                <div className="mt-2 text-[11px] font-mono text-rose-400 bg-rose-950/60 p-2 rounded">
                  Vector: {selectedVuln.exploitVector}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">Remediation Guide</h4>
                <p className="text-xs text-emerald-200/90 leading-relaxed">{selectedVuln.remediation}</p>
              </div>
            </div>
          ) : (
            <div className="text-slate-500 text-xs italic">Select a vulnerability from the list to inspect details.</div>
          )}
        </div>
      </div>
    </div>
  );
};
