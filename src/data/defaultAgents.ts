import { AgentPersona } from '../types/agent';

export const DEFAULT_AGENTS: AgentPersona[] = [
  {
    id: 'agent-security',
    name: 'Sentix',
    codename: 'SEC-SENTIX-01',
    role: 'SECURITY',
    avatar: '🛡️',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    model: 'Claude 3.7 Sonnet / DeepSeek-R1 (SAST Engine)',
    temperature: 0.1,
    enabled: true,
    executionOrder: 1,
    capabilities: [
      'OWASP Top 10 & SANS Top 25 Audit',
      'CVE / CWE Knowledge Graph Matching',
      'Secret Leak & Credential Entropy Analysis',
      'Timing Attack & Cryptographic Flaw Detection',
      'Exploit Payload Proof-of-Concept Generation'
    ],
    systemPrompt: 'You are Sentix, an elite Principal Application Security Engineer & Red Teamer. You inspect abstract syntax trees for high-severity vulnerabilities, CVSS score mapping, and exploit scenarios.'
  },
  {
    id: 'agent-arch',
    name: 'Archon',
    codename: 'ARCH-SYS-02',
    role: 'ARCHITECTURE',
    avatar: '🏛️',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    model: 'Gemini 2.5 Flash / GPT-4o Architecture',
    temperature: 0.2,
    enabled: true,
    executionOrder: 2,
    capabilities: [
      'Cyclomatic Complexity Decomposition',
      'SOLID & Clean Code Principle Enforcement',
      'Anti-Pattern & Code Smell Identification',
      'Coupling & Cohesion Dependency Graphing',
      'State Management & Concurrency Audit'
    ],
    systemPrompt: 'You are Archon, a Staff Software Architect. You analyze code structure, modularity, coupling, data modeling, and maintainability indices.'
  },
  {
    id: 'agent-perf',
    name: 'Velox',
    codename: 'PERF-VELOX-03',
    role: 'PERFORMANCE',
    avatar: '⚡',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    model: 'Llama 3.3 70B Turbo Engine',
    temperature: 0.1,
    enabled: true,
    executionOrder: 3,
    capabilities: [
      'Asymptotic Time & Space Complexity (Big-O)',
      'Memory Leak & Allocation Hotspot Detection',
      'Database N+1 & Query Inefficiency Finder',
      'Async/Await Bottlenecks & Event Loop Blocking',
      'Throughput & Latency Estimation'
    ],
    systemPrompt: 'You are Velox, a High-Frequency Performance Engineering Agent. You pinpoint runtime bottlenecks, cache misses, unnecessary allocations, and unbounded state collections.'
  },
  {
    id: 'agent-test',
    name: 'Testify',
    codename: 'QA-TESTIFY-04',
    role: 'TESTING',
    avatar: '🧪',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    model: 'Claude 3.5 Sonnet QA Matrix',
    temperature: 0.3,
    enabled: true,
    executionOrder: 4,
    capabilities: [
      'Edge Case & Boundary Value Matrix Generation',
      'Automated Jest / PyTest / Go Test Suite Authoring',
      'Mock Fixtures & Negative Assertion Synthesizer',
      'Fuzz Testing Input Generation',
      'Code Coverage Projection (Branch & Statement)'
    ],
    systemPrompt: 'You are Testify, a Senior QA Automation Architect. You author resilient, production-ready unit and integration test suites that guard against regressions and test all edge-cases.'
  },
  {
    id: 'agent-patch',
    name: 'Synthesizer',
    codename: 'PATCH-SYNTH-05',
    role: 'SYNTHESIZER',
    avatar: '🔧',
    color: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    model: 'NexusOps Multi-Agent Consensus Synthesizer',
    temperature: 0.0,
    enabled: true,
    executionOrder: 5,
    capabilities: [
      'Multi-Agent Consensus Reconciliation',
      'Unified Git Diff Patch Compilation',
      'Automated Pull Request Title & Description Authoring',
      'Breaking Change Impact Assessment',
      '1-Click Patch Application Validation'
    ],
    systemPrompt: 'You are the Auto-Patch Synthesizer. You aggregate findings from Security, Architecture, Performance, and Testing agents to produce the minimal, cleanest, safest, zero-regression unified diff patch.'
  }
];
