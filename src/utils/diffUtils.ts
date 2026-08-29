import { DiffChunk } from '../types/repository';

export function generateDiffChunks(oldCode: string, newCode: string): DiffChunk[] {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  
  const chunk: DiffChunk = {
    oldStart: 1,
    oldLines: oldLines.length,
    newStart: 1,
    newLines: newLines.length,
    lines: []
  };

  let oldIdx = 0;
  let newIdx = 0;

  while (oldIdx < oldLines.length || newIdx < newLines.length) {
    const oldLine = oldLines[oldIdx];
    const newLine = newLines[newIdx];

    if (oldLine === newLine) {
      if (oldLine !== undefined) {
        chunk.lines.push({
          type: 'normal',
          content: oldLine,
          oldLineNumber: oldIdx + 1,
          newLineNumber: newIdx + 1
        });
      }
      oldIdx++;
      newIdx++;
    } else {
      if (oldLine !== undefined && (newLine === undefined || !newLines.slice(newIdx, newIdx + 3).includes(oldLine))) {
        chunk.lines.push({
          type: 'delete',
          content: oldLine,
          oldLineNumber: oldIdx + 1
        });
        oldIdx++;
      } else if (newLine !== undefined) {
        chunk.lines.push({
          type: 'add',
          content: newLine,
          newLineNumber: newIdx + 1
        });
        newIdx++;
      }
    }
  }

  return [chunk];
}

export function calculatePatchStats(oldCode: string, newCode: string) {
  const oldLines = oldCode.split('\n');
  const newLines = newCode.split('\n');
  let additions = 0;
  let deletions = 0;

  const oldSet = new Set(oldLines);
  const newSet = new Set(newLines);

  for (const line of newLines) {
    if (!oldSet.has(line)) additions++;
  }
  for (const line of oldLines) {
    if (!newSet.has(line)) deletions++;
  }

  return { additions, deletions, filesChanged: 1 };
}
