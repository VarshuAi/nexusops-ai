export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function getSeverityBg(severity: string): string {
  switch (severity.toUpperCase()) {
    case 'CRITICAL': return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
    case 'HIGH': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    case 'LOW': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 75) return 'text-cyan-400';
  if (score >= 50) return 'text-amber-400';
  return 'text-rose-400';
}
