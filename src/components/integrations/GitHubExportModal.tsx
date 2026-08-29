import React, { useState } from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { GITHUB_ACTION_WORKFLOW, CLI_INSTALL_COMMANDS } from '../../data/integrationTemplates';
import { Sparkles, Copy, Check, Terminal, Download, GitBranch } from 'lucide-react';

export const GitHubExportModal: React.FC = () => {
  const { vulnerabilities } = useNexusStore();
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(GITHUB_ACTION_WORKFLOW);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  const handleDownloadSarif = () => {
    const sarif = {
      $schema: "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
      version: "2.1.0",
      runs: [
        {
          tool: {
            driver: {
              name: "NexusOps AI Engine",
              version: "2.5.0",
              rules: vulnerabilities.map(v => ({
                id: v.id,
                name: v.cveOrCwe,
                shortDescription: { text: v.title },
                fullDescription: { text: v.description }
              }))
            }
          },
          results: vulnerabilities.map(v => ({
            ruleId: v.id,
            message: { text: v.description },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: { uri: v.file },
                  region: { startLine: v.lineRange[0], endLine: v.lineRange[1] }
                }
              }
            ]
          }))
        }
      ]
    };

    const blob = new Blob([JSON.stringify(sarif, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexusops-report-${Date.now()}.sarif`;
    a.click();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-y-auto p-6 space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0d1222] to-cyan-950/40 border border-indigo-500/20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            GitHub Actions CI/CD & Integration Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Deploy autonomous PR review gates, upload SARIF findings to GitHub Security Tab, and run CLI audits locally.
          </p>
        </div>

        <button
          onClick={handleDownloadSarif}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          Download SARIF Security Report
        </button>
      </div>

      <div className="rounded-2xl bg-[#0c101c] border border-slate-800 overflow-hidden">
        <div className="px-5 py-3 bg-[#0f1424] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>.github/workflows/nexusops-pr-review.yml</span>
          </div>
          <button
            onClick={handleCopyWorkflow}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            {copiedWorkflow ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedWorkflow ? 'Copied Workflow!' : 'Copy YAML'}
          </button>
        </div>
        <pre className="p-5 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed">
          {GITHUB_ACTION_WORKFLOW}
        </pre>
      </div>

      <div className="p-6 rounded-2xl bg-[#0c101c] border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          NexusOps CLI Quick Invocation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Local NPX Run</span>
            <code className="text-indigo-300 select-all">{CLI_INSTALL_COMMANDS.npm}</code>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Docker Containerized Run</span>
            <code className="text-cyan-300 select-all">{CLI_INSTALL_COMMANDS.docker}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
