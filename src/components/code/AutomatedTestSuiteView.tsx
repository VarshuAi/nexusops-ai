import React, { useState } from 'react';
import { useNexusStore } from '../../store/useNexusStore';
import { FlaskConical, Play, CheckCircle2, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AutomatedTestSuiteView: React.FC = () => {
  const { patchResult, language, filename } = useNexusStore();
  const [copied, setCopied] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const testCode = patchResult?.testSuiteGenerated || `// Run NexusOps Multi-Agent Audit to generate automated tests for ${filename}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(testCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRun = () => {
    setIsRunningTests(true);
    setTestOutput(null);

    setTimeout(() => {
      setIsRunningTests(false);
      setTestOutput(` PASS  src/app/api/auth/session/route.test.ts
  Auth Session Route Security & Regression Suite
    ✓ should REJECT tokens with 'none' algorithm (CVE-2015-9235 defense) (12 ms)
    ✓ should securely verify valid HS256 signed token (4 ms)
    ✓ should reject unauthenticated request with 401 status (2 ms)
    ✓ should sanitize user query string parameters against injection (3 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.824 s
Ran all test suites. Coverage: 94.6% statements, 91.2% branch`);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080c16] overflow-hidden">
      <div className="px-6 py-3.5 border-b border-slate-800 bg-[#0d121f] flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-400" />
            Autonomous Automated QA & Security Regression Test Suite
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Auto-synthesized unit test specs asserting rejection of attack payloads and edge cases.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Tests' : 'Copy Test Suite'}
          </button>

          <button
            onClick={handleSimulateRun}
            disabled={isRunningTests}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md shadow-emerald-950 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isRunningTests ? 'Running Test Runner...' : 'Execute Test Suite'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
        {testOutput && (
          <div className="p-4 rounded-xl bg-[#090d18] border border-emerald-500/40 text-emerald-300 whitespace-pre leading-relaxed shadow-lg">
            {testOutput}
          </div>
        )}

        <div className="rounded-xl border border-slate-800 bg-[#090d18] overflow-hidden">
          <div className="px-4 py-2 bg-[#0c101c] border-b border-slate-800 text-[11px] text-slate-400 font-bold">
            Target Test File: {filename.replace(/\.[^/.]+$/, "")}.test.ts
          </div>
          <pre className="p-4 text-slate-200 whitespace-pre overflow-x-auto leading-6">
            {testCode}
          </pre>
        </div>
      </div>
    </div>
  );
};
