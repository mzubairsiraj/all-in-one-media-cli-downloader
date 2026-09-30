import { DependencyStatus } from '../../types/dependency.types.js';
import ProcessRunner from '../process-runner.js';

export class YtDlpService {
  constructor(private readonly processRunner: ProcessRunner) {}

  async getVersion(): Promise<string | null> {
    try {
      const result = await this.processRunner.run('yt-dlp', ['--version']);

      if (!result.success || !result.stdout) {
        return null;
      }

      return result.stdout.trim();
    } catch (error) {
      if (error instanceof Error) {
        console.log(`[Error]: Failed to get version. ${error.message}`);
      }
      return null;
    }
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
        version: null,
        isAvailable: false,
        error: result.stderr.trim() || 'Failed to get yt-dlp version',
      };
    }

    return {
      name: 'yt-dlp',
      version: result.stdout.trim() || null,
      isAvailable: true,
    };
  }
}
