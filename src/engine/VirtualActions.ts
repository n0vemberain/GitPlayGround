import { ActionWorkflow, WorkflowRunInstance, ActionJob } from '../types/actions';

export class VirtualActionsRunner {
  private workflows: Record<string, ActionWorkflow> = {};

  constructor() {
    this.initDefaultWorkflows();
  }

  private initDefaultWorkflows() {
    const ciWorkflow: ActionWorkflow = {
      id: 'ci-matrix',
      name: 'CI Matrix & Build Verification',
      filename: '.github/workflows/ci.yml',
      on: {
        push: { branches: ['main', 'develop'] },
        pull_request: { branches: ['main'] },
        workflow_dispatch: {}
      },
      jobs: {
        'lint': {
          id: 'lint',
          name: 'Code Linter & Security Scan',
          runsOn: 'ubuntu-latest',
          status: 'idle',
          steps: [
            { id: 'l1', name: 'Checkout repository', uses: 'actions/checkout@v4', status: 'idle', logs: ['Cloning repository...', 'HEAD detached at commit SHA', 'Checkout complete.'], durationMs: 400 },
            { id: 'l2', name: 'Run ESLint & Prettier', run: 'npm run lint', status: 'idle', logs: ['Running ESLint across 42 files...', 'No lint errors found ✨'], durationMs: 650 }
          ]
        },
        'test-matrix-node18': {
          id: 'test-matrix-node18',
          name: 'Unit Tests (Node 18.x)',
          runsOn: 'ubuntu-latest',
          dependsOnJobIds: ['lint'],
          status: 'idle',
          steps: [
            { id: 't1', name: 'Setup Node.js 18', uses: 'actions/setup-node@v4', status: 'idle', logs: ['Resolved node version 18.20.4', 'Adding npm to PATH'], durationMs: 450 },
            { id: 't2', name: 'Restore Dependency Cache', uses: 'actions/cache@v4', status: 'idle', logs: ['Cache hit for key: npm-ubuntu-hash91', '120MB restored in 0.3s'], durationMs: 300 },
            { id: 't3', name: 'Run Test Suites', run: 'npm test -- --coverage', status: 'idle', logs: ['PASS src/engine/VirtualGit.test.ts', 'Tests: 18 passed, 18 total', 'Coverage: 96.4%'], durationMs: 1200 }
          ]
        },
        'test-matrix-node20': {
          id: 'test-matrix-node20',
          name: 'Unit Tests (Node 20.x)',
          runsOn: 'ubuntu-latest',
          dependsOnJobIds: ['lint'],
          status: 'idle',
          steps: [
            { id: 't4', name: 'Setup Node.js 20', uses: 'actions/setup-node@v4', status: 'idle', logs: ['Resolved node version 20.18.0', 'Environment prepared.'], durationMs: 400 },
            { id: 't5', name: 'Run Test Suites', run: 'npm test', status: 'idle', logs: ['PASS src/engine/VirtualGit.test.ts', 'Tests: 18 passed, 18 total'], durationMs: 950 }
          ]
        },
        'deploy': {
          id: 'deploy',
          name: 'Deploy Preview / Artifacts',
          runsOn: 'ubuntu-latest',
          dependsOnJobIds: ['test-matrix-node18', 'test-matrix-node20'],
          status: 'idle',
          steps: [
            { id: 'd1', name: 'Build Production Bundle', run: 'npm run build', status: 'idle', logs: ['vite v6.2.0 building for production...', 'dist/index.html 0.8 kB', 'dist/assets/index.js 142 kB', 'Done in 410ms'], durationMs: 800 },
            { id: 'd2', name: 'Upload Artifact to GitHub Pages', uses: 'actions/upload-pages-artifact@v3', status: 'idle', logs: ['Uploading artifact bundle...', 'Artifact ID: 948102', 'Success!'], durationMs: 500 }
          ]
        }
      },
      yamlContent: `name: CI Matrix & Build Verification

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run ESLint
        run: npm run lint

  test:
    needs: lint
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - uses: actions/cache@v4
        with:
          path: ~/.npm
          key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3`
    };

    this.workflows[ciWorkflow.id] = ciWorkflow;
  }

  public getWorkflows(): ActionWorkflow[] {
    return Object.values(this.workflows);
  }

  public getWorkflow(id: string): ActionWorkflow | undefined {
    return this.workflows[id];
  }

  public createRun(workflowId: string, commitHash: string, branch: string): WorkflowRunInstance {
    const wf = this.workflows[workflowId] || Object.values(this.workflows)[0];
    const clonedJobs: Record<string, ActionJob> = JSON.parse(JSON.stringify(wf.jobs));

    return {
      id: `run-${Date.now()}`,
      workflowId: wf.id,
      workflowName: wf.name,
      event: 'push',
      commitHash,
      branch,
      status: 'queued',
      startedAt: Date.now(),
      durationMs: 0,
      jobs: clonedJobs
    };
  }
}
