import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitState, Commit } from '../../types/git';
import { GitCommit, Tag as TagIcon, X, Calendar, User, FileText, CornerDownRight } from 'lucide-react';

interface GitGraphProps {
  gitState: GitState;
  onSelectCommit?: (commit: Commit) => void;
}

export const GitGraph: React.FC<GitGraphProps> = ({ gitState }) => {
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);

  // Compute graph layout (X, Y coordinates for each commit)
  const commitList = Object.values(gitState.commits).sort((a, b) => a.timestamp - b.timestamp);
  
  // Track branch lanes (Y-axis rows)
  const branchLanes: Record<string, number> = { 'main': 0 };
  let nextLane = 1;

  const positions: Record<string, { x: number; y: number; branch: string }> = {};

  commitList.forEach((commit, index) => {
    let lane = 0;
    if (commit.branch && branchLanes[commit.branch] !== undefined) {
      lane = branchLanes[commit.branch];
    } else if (commit.branch) {
      branchLanes[commit.branch] = nextLane;
      lane = nextLane;
      nextLane++;
    }

    const x = 70 + index * 95;
    const y = 80 + lane * 75;
    positions[commit.id] = { x, y, branch: commit.branch || 'main' };
  });

  const currentCommitId = gitState.HEAD.type === 'branch'
    ? gitState.branches[gitState.HEAD.target]?.targetCommitId
    : gitState.HEAD.target;

  const svgWidth = Math.max(700, 100 + commitList.length * 105);
  const svgHeight = Math.max(300, 120 + nextLane * 75);

  return (
    <div className="relative w-full h-full flex flex-col bg-gh-canvas-inset overflow-hidden select-none">
      {/* Top Bar inside Graph */}
      <div className="h-9 border-b border-gh-border/60 px-4 flex items-center justify-between bg-gh-canvas/40 backdrop-blur-sm z-10 text-xs">
        <div className="flex items-center space-x-2">
          <GitCommit className="w-4 h-4 text-gh-accent" />
          <span className="font-semibold text-gh-text tracking-wide">Interactive Commit Graph (DAG)</span>
          <span className="text-gh-text-muted text-[11px] font-mono">({commitList.length} commits)</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-gh-text-muted">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gh-accent inline-block" />
            <span>Regular</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gh-purple inline-block" />
            <span>Merge</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gh-attention inline-block" />
            <span>Rebase</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <svg width={svgWidth} height={svgHeight} className="overflow-visible min-w-full">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="18"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#30363d" />
            </marker>
          </defs>

          {/* Render Parent Connection Lines (Edges) */}
          {commitList.map(commit => {
            const currentPos = positions[commit.id];
            if (!currentPos || !commit.parents) return null;

            return commit.parents.map(parentId => {
              const parentPos = positions[parentId];
              if (!parentPos) return null;

              // Curved bezier for merges or different lanes
              const isDifferentLane = currentPos.y !== parentPos.y;
              const pathData = isDifferentLane
                ? `M ${parentPos.x} ${parentPos.y} C ${parentPos.x + 40} ${parentPos.y}, ${currentPos.x - 40} ${currentPos.y}, ${currentPos.x} ${currentPos.y}`
                : `M ${parentPos.x} ${parentPos.y} L ${currentPos.x} ${currentPos.y}`;

              return (
                <motion.path
                  key={`${parentId}->${commit.id}`}
                  d={pathData}
                  fill="none"
                  stroke={commit.isMerge ? '#8957e5' : '#30363d'}
                  strokeWidth={commit.isMerge ? 2.5 : 2}
                  strokeDasharray={commit.isRebase ? '4 3' : 'none'}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              );
            });
          })}

          {/* Render Commit Nodes */}
          {commitList.map(commit => {
            const pos = positions[commit.id];
            if (!pos) return null;

            const isCurrentHead = commit.id === currentCommitId;
            const branchesHere = Object.values(gitState.branches).filter(b => b.targetCommitId === commit.id);
            const tagsHere = Object.values(gitState.tags).filter(t => t.targetCommitId === commit.id);

            let nodeColor = '#58a6ff';
            if (commit.isMerge) nodeColor = '#8957e5';
            else if (commit.isRebase) nodeColor = '#d29922';
            else if (commit.isCherryPick) nodeColor = '#f85149';

            return (
              <g key={commit.id} className="cursor-pointer group" onClick={() => setSelectedCommit(commit)}>
                {/* Glow ring if HEAD */}
                {isCurrentHead && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r={20}
                    fill="none"
                    stroke="#58a6ff"
                    strokeWidth={2}
                    strokeDasharray="4 3"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  />
                )}

                {/* Commit Circle */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={12}
                  fill={nodeColor}
                  stroke="#161b22"
                  strokeWidth={3}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />

                {/* Commit Hash Label */}
                <text
                  x={pos.x}
                  y={pos.y + 26}
                  textAnchor="middle"
                  className="text-[11px] font-mono fill-gh-text-muted group-hover:fill-gh-text font-medium select-none"
                >
                  {commit.hash}
                </text>

                {/* Commit Message Tooltip Preview */}
                <text
                  x={pos.x}
                  y={pos.y + 39}
                  textAnchor="middle"
                  className="text-[10px] fill-gh-text-subtle truncate max-w-[80px] select-none"
                >
                  {commit.message.length > 12 ? commit.message.substring(0, 12) + '...' : commit.message}
                </text>

                {/* Branch Badges floating above commit */}
                {branchesHere.length > 0 && (
                  <g transform={`translate(${pos.x - 25}, ${pos.y - 36})`}>
                    {branchesHere.map((branch, bIdx) => {
                      const isHeadBranch = gitState.HEAD.type === 'branch' && gitState.HEAD.target === branch.name;
                      return (
                        <g key={branch.name} transform={`translate(0, ${-bIdx * 20})`}>
                          <rect
                            x={0}
                            y={0}
                            width={Math.max(50, branch.name.length * 7 + 16)}
                            height={18}
                            rx={4}
                            fill={isHeadBranch ? '#1f6feb' : '#21262d'}
                            stroke={isHeadBranch ? '#58a6ff' : '#30363d'}
                            strokeWidth={1}
                          />
                          <text
                            x={6}
                            y={12}
                            className="text-[10px] font-mono font-bold fill-white select-none"
                          >
                            {isHeadBranch ? `* ${branch.name}` : branch.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}

                {/* Tags */}
                {tagsHere.map((tag, tIdx) => (
                  <g key={tag.name} transform={`translate(${pos.x + 14}, ${pos.y - 12 - tIdx * 18})`}>
                    <rect x={0} y={0} width={45} height={16} rx={3} fill="#9e6a03" />
                    <text x={4} y={11} className="text-[9px] font-mono font-bold fill-white">
                      🏷 {tag.name}
                    </text>
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Commit Detail Modal */}
      <AnimatePresence>
        {selectedCommit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4 w-96 bg-gh-canvas border border-gh-border rounded-lg shadow-2xl p-4 z-20"
          >
            <div className="flex items-start justify-between border-b border-gh-border pb-2.5">
              <div className="flex items-center space-x-2">
                <GitCommit className="w-5 h-5 text-gh-accent" />
                <div>
                  <div className="font-mono text-xs font-bold text-gh-text">{selectedCommit.hash}</div>
                  <div className="text-[11px] text-gh-text-muted">Commit Object Details</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCommit(null)}
                className="text-gh-text-muted hover:text-gh-text p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="font-semibold text-gh-text text-sm">{selectedCommit.message}</div>

              <div className="flex items-center space-x-2 text-gh-text-muted text-[11px]">
                <User className="w-3.5 h-3.5" />
                <span>{selectedCommit.author}</span>
              </div>

              <div className="flex items-center space-x-2 text-gh-text-muted text-[11px]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(selectedCommit.timestamp).toLocaleTimeString()}</span>
              </div>

              <div className="flex items-center space-x-2 text-gh-text-muted text-[11px] font-mono">
                <CornerDownRight className="w-3.5 h-3.5 text-gh-accent" />
                <span>Parent(s): {selectedCommit.parents.length > 0 ? selectedCommit.parents.join(', ') : '(Root initial commit)'}</span>
              </div>

              <div className="mt-3 pt-2 border-t border-gh-border">
                <div className="text-[11px] font-semibold text-gh-text-muted uppercase mb-1.5 flex items-center space-x-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Snapshot Files in Tree ({selectedCommit.treeHash})</span>
                </div>
                <div className="bg-gh-canvas-inset rounded p-2 max-h-28 overflow-y-auto font-mono text-[11px] space-y-1">
                  {Object.entries(selectedCommit.files).map(([name, content]) => (
                    <div key={name} className="flex justify-between text-gh-text">
                      <span className="text-gh-accent">{name}</span>
                      <span className="text-gh-text-muted">({content.length} bytes)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
