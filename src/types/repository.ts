export interface CodeSnippetSample {
  id: string;
  name: string;
  category: 'Full-Stack' | 'Backend API' | 'Cloud Infra' | 'Algorithms' | 'Smart Contract';
  language: 'typescript' | 'python' | 'go' | 'rust' | 'dockerfile';
  filename: string;
  description: string;
  code: string;
  expectedIssues: string[];
}

export interface DiffChunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: Array<{
    type: 'add' | 'delete' | 'normal';
    content: string;
    oldLineNumber?: number;
    newLineNumber?: number;
  }>;
}

export interface UnifiedPatchResult {
  filename: string;
  originalCode: string;
  patchedCode: string;
  diffSummary: {
    additions: number;
    deletions: number;
    filesChanged: number;
  };
  chunks: DiffChunk[];
  prTitle: string;
  prDescription: string;
  testSuiteGenerated: string;
}
