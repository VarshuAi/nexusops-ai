export interface CodeMetrics {
  linesOfCode: number;
  cyclomaticComplexity: number;
  maintainabilityIndex: number;
  securityScore: number;
  estimatedTestCoverage: number;
  duplicationPercentage: number;
  performanceGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  totalVulnerabilities: number;
  fixedVulnerabilities: number;
}

export interface PipelineExecutionSummary {
  runId: string;
  startTime: string;
  endTime?: string;
  totalDurationMs: number;
  totalTokens: number;
  costEstimatedUsd: number;
  agentsExecuted: number;
  vulnerabilitiesFound: number;
  autoFixesSynthesized: number;
  coverageGeneratedPercentage: number;
}
