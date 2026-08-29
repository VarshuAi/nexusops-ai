export type AgentRole = 'SECURITY' | 'ARCHITECTURE' | 'PERFORMANCE' | 'TESTING' | 'SYNTHESIZER' | 'CUSTOM';

export type AgentStatus = 'IDLE' | 'ANALYZING' | 'STREAMING' | 'COMPLETED' | 'ERROR' | 'SKIPPED';

export interface AgentPersona {
  id: string;
  name: string;
  codename: string;
  role: AgentRole;
  avatar: string;
  color: string;
  glowColor: string;
  model: string;
  temperature: number;
  systemPrompt: string;
  enabled: boolean;
  capabilities: string[];
  executionOrder: number;
}

export interface AgentLog {
  id: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success' | 'debug';
  message: string;
  metadata?: Record<string, any>;
}

export interface AgentThoughtStep {
  step: number;
  action: string;
  thought: string;
  evidence?: string;
  confidence: number;
}

export interface AgentResult {
  agentId: string;
  role: AgentRole;
  status: AgentStatus;
  executionTimeMs: number;
  tokensUsed: {
    prompt: number;
    completion: number;
    total: number;
  };
  confidenceScore: number;
  thoughts: AgentThoughtStep[];
  findings: string[];
  recommendations: string[];
  dataPayload?: any;
}
