import React from 'react';
import { useNexusStore } from './store/useNexusStore';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { StatusBar } from './components/layout/StatusBar';
import { CodeWorkspace } from './components/code/CodeWorkspace';
import { DiffViewer } from './components/code/DiffViewer';
import { AgentPipelineCanvas } from './components/pipeline/AgentPipelineCanvas';
import { SecurityMatrix } from './components/security/SecurityMatrix';
import { SystemHealthGauges } from './components/metrics/SystemHealthGauges';
import { AgentPersonaBuilder } from './components/agents/AgentPersonaBuilder';
import { AutomatedTestSuiteView } from './components/code/AutomatedTestSuiteView';
import { GitHubExportModal } from './components/integrations/GitHubExportModal';

export function App() {
  const { activeTab } = useNexusStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'WORKSPACE':
        return <CodeWorkspace />;
      case 'PIPELINE':
        return <AgentPipelineCanvas />;
      case 'DIFF':
        return <DiffViewer />;
      case 'SECURITY':
        return <SecurityMatrix />;
      case 'METRICS':
        return <SystemHealthGauges />;
      case 'AGENTS':
        return <AgentPersonaBuilder />;
      case 'TESTS':
        return <AutomatedTestSuiteView />;
      case 'INTEGRATIONS':
        return <GitHubExportModal />;
      default:
        return <CodeWorkspace />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#070a13] text-slate-100">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {renderActiveView()}
        </main>
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
