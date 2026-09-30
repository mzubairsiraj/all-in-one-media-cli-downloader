import { execa } from 'execa';

import type { ProcessResult } from '../types/process.types.js';

class ProcessRunner {
  async run(command: string, args: string[] = []): Promise<ProcessResult> {
    try {
      const result = await execa(command, args, {
        reject: false,
      });

      if (result.exitCode === 0) {
        return {
          stdout: result.stdout.trim(),
          stderr: result.stderr.trim(),
          code: result.exitCode ?? null,
          success: true,
        };
      } else {
        return {
          stdout: result.stdout.trim(),
          stderr: result.stderr.trim(),
          code: result.exitCode ?? null,
          success: false,
        };
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown process execution error';
      return {
        stdout: '',
        stderr: message,
        code: null,
        success: false,
      };
    }
  }
}

export default ProcessRunner;
