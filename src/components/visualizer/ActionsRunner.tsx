import React, { useState } from 'react';
import { Play, CheckCircle2, Clock, Terminal, Check, AlertCircle, FileCode, Cpu, Layers } from 'lucide-react';
import { VirtualActionsRunner } from '../../engine/VirtualActions';
import { ActionJob, ActionStep, WorkflowRunInstance } from '../../types/actions';

interface ActionsRunnerProps {
  language: 'bn' | 'en';
}

export const ActionsRunner: React.FC<ActionsRunnerProps> = ({ language }) => {
  const [runner] = useState(() => new VirtualActionsRunner());
  const [activeWorkflow] = useState(() => runner.getWorkflows()[0]);
  const [currentRun, setCurrentRun] = useState<WorkflowRunInstance | null>(null);
  const [activeJobId, setActiveJobId] = useState<string>('lint');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const startPipelineRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    const newRun = runner.createRun(activeWorkflow.id, '3a7c91e', 'main');
    setCurrentRun(newRun);

    // Simulate Step-by-Step execution
    const jobKeys = Object.keys(newRun.jobs);
    let jobIdx = 0;

    const executeJob = (index: number) => {
      if (index >= jobKeys.length) {
        setIsRunning(false);
        setCurrentRun(prev => prev ? { ...prev, status: 'completed' } : null);
        return;
      }

      const jId = jobKeys[index];
      setActiveJobId(jId);

      setCurrentRun(prev => {
        if (!prev) return null;
        const updated = { ...prev };
        updated.jobs[jId].status = 'running';
        return updated;
      });

      // Simulate steps running
      setTimeout(() => {
        setCurrentRun(prev => {
          if (!prev) return null;
          const updated = { ...prev };
          updated.jobs[jId].status = 'success';
          updated.jobs[jId].steps.forEach(s => s.status = 'success');
          return updated;
        });
        executeJob(index + 1);
      }, 1200);
    };

    executeJob(0);
  };

  const selectedJob = currentRun ? currentRun.jobs[activeJobId] : activeWorkflow.jobs[activeJobId] || Object.values(activeWorkflow.jobs)[0];

  return (
    <div className="flex-1 flex flex-col bg-gh-canvas-inset overflow-hidden select-none">
      {/* Action Header */}
      <div className="h-12 border-b border-gh-border px-4 flex items-center justify-between bg-gh-canvas-subtle">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-gh-accent" />
          <span className="font-semibold text-xs text-gh-text">{activeWorkflow.name}</span>
          <span className="text-[10px] text-gh-text-muted font-mono bg-gh-border/40 px-1.5 py-0.5 rounded">
            {activeWorkflow.filename}
          </span>
        </div>
        <button
          onClick={startPipelineRun}
          disabled={isRunning}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white shadow-sm transition ${
            isRunning
              ? 'bg-gh-border text-gh-text-muted cursor-not-allowed'
              : 'bg-gh-success hover:bg-gh-success-emphasis'
          }`}
        >
          {isRunning ? (
            <>
              <Clock className="w-3.5 h-3.5 animate-spin text-gh-attention-fg" />
              <span>{language === 'bn' ? 'পাইপলাইন চলছে...' : 'Running Workflow...'}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'bn' ? 'রান ওয়ার্কফ্লো' : 'Run Workflow'}</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left: Job DAG Pipeline (7 cols) */}
        <div className="col-span-7 border-r border-gh-border p-4 overflow-y-auto space-y-4">
          <div className="text-xs font-semibold text-gh-text-muted uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Workflow Jobs Dependency Graph</span>
            <span className="font-mono text-[10px]">ubuntu-latest</span>
          </div>

          <div className="space-y-3">
            {Object.values(currentRun ? currentRun.jobs : activeWorkflow.jobs).map((job) => {
              const isSelected = job.id === activeJobId;
              return (
                <div
                  key={job.id}
                  onClick={() => setActiveJobId(job.id)}
                  className={`border rounded-lg p-3 transition cursor-pointer ${
                    isSelected
                      ? 'border-gh-accent bg-gh-accent/10 shadow-md'
                      : 'border-gh-border bg-gh-canvas hover:border-gh-border-active'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {job.status === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-gh-success-fg" />
                      ) : job.status === 'running' ? (
                        <Clock className="w-4 h-4 text-gh-attention-fg animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gh-text-muted" />
                      )}
                      <span className="font-semibold text-xs text-gh-text">{job.name}</span>
                    </div>
                    <span className="text-[10px] text-gh-text-muted font-mono">{job.steps.length} steps</span>
                  </div>

                  {job.dependsOnJobIds && (
                    <div className="mt-2 text-[10px] text-gh-text-subtle font-mono flex items-center space-x-1">
                      <span>needs:</span>
                      <span className="text-gh-accent">[{job.dependsOnJobIds.join(', ')}]</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Workflow YAML Viewer */}
          <div className="mt-4 pt-4 border-t border-gh-border">
            <div className="text-xs font-semibold text-gh-text-muted mb-2 flex items-center space-x-1.5">
              <FileCode className="w-3.5 h-3.5 text-gh-accent" />
              <span>Workflow Definition (YAML)</span>
            </div>
            <pre className="bg-gh-canvas p-3 rounded-md text-[11px] font-mono text-gh-text-muted overflow-x-auto border border-gh-border leading-relaxed">
              {activeWorkflow.yamlContent}
            </pre>
          </div>
        </div>

        {/* Right: Steps & Real-Time Console Logs (5 cols) */}
        <div className="col-span-5 bg-gh-canvas flex flex-col overflow-hidden">
          <div className="h-10 border-b border-gh-border px-3 flex items-center justify-between text-xs font-semibold text-gh-text bg-gh-canvas-subtle">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-gh-accent" />
              <span>Step Logs: {selectedJob?.name}</span>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-3 font-mono text-[11px]">
            {selectedJob?.steps.map((step, idx) => (
              <div key={step.id} className="border border-gh-border/70 rounded p-2 bg-gh-canvas-inset">
                <div className="flex items-center justify-between pb-1 border-b border-gh-border/40 text-gh-text font-medium">
                  <span className="flex items-center space-x-1.5">
                    {step.status === 'success' ? (
                      <Check className="w-3 h-3 text-gh-success-fg" />
                    ) : (
                      <span className="text-gh-text-muted">{idx + 1}.</span>
                    )}
                    <span>{step.name}</span>
                  </span>
                  <span className="text-gh-text-subtle text-[10px]">{step.durationMs}ms</span>
                </div>
                <div className="mt-1.5 space-y-0.5 text-gh-text-muted">
                  {step.logs.map((log, lIdx) => (
                    <div key={lIdx} className="leading-tight text-[10px] text-emerald-400/90">
                      &gt; {log}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
