import { DependencyStatus } from '../../types/dependency.types.js';
import ProcessRunner from '../process-runner.js';

export class YtDlpService {
  constructor(private readonly processRunner: ProcessRunner) {}

  async getVersion(): Promise<string | null> {
    const result = await this.processRunner.run('yt-dlp', ['--version']);

    if (!result.success || !result.stdout) {
      return null;
    }

    return result.stdout.trim();
  }

  async isAvailable(): Promise<boolean> {
    const version = await this.getVersion();
    return version !== null;
  }

  async check(): Promise<DependencyStatus> {
    const result = await this.processRunner.run('yt-dlp', ['--version']);

    if (!result.success || !result.stdout) {
      return {
        name: 'yt-dlp',
        isAvailable: false,
        version: null,
        error: result.stderr.trim() || 'Failed to get yt-dlp version',
      };
    }

    return {
      name: 'yt-dlp',
      isAvailable: true,
      version: result.stdout.trim() || null,
    };
  }
}
