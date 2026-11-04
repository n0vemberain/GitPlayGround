export interface ActionStep {
  id: string;
  name: string;
  uses?: string;
  run?: string;
  with?: Record<string, string>;
  env?: Record<string, string>;
  status: 'idle' | 'running' | 'success' | 'failed' | 'skipped';
  logs: string[];
  durationMs: number;
}

export interface ActionJob {
  id: string;
  name: string;
  runsOn: string;
  needs?: string[];
  matrix?: {
    os?: string[];
    node?: string[];
    [key: string]: string[] | undefined;
  };
  steps: ActionStep[];
  status: 'idle' | 'queued' | 'running' | 'success' | 'failed';
  dependsOnJobIds?: string[];
}

export interface ActionWorkflow {
  id: string;
  name: string;
  filename: string;
  on: {
    push?: { branches?: string[] };
    pull_request?: { branches?: string[] };
    workflow_dispatch?: Record<string, unknown>;
    schedule?: { cron: string }[];
  };
  jobs: Record<string, ActionJob>;
  yamlContent: string;
}

export interface WorkflowRunInstance {
  id: string;
  workflowId: string;
  workflowName: string;
  event: 'push' | 'pull_request' | 'workflow_dispatch' | 'schedule';
  commitHash: string;
  branch: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed';
  startedAt: number;
  durationMs: number;
  jobs: Record<string, ActionJob>;
}
