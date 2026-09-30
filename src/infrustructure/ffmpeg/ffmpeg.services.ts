import { DependencyStatus } from '../../types/dependency.types.js';
import ProcessRunner from '../process-runner.js';

export class FfmpegService {
  constructor(private readonly processRunner: ProcessRunner) {}

  async getVersion(): Promise<string | null> {
    try {
      const result = await this.processRunner.run('ffmpeg', ['-version']);

      if (!result.stdout || !result.success) {
        return null;
      }
      return this.getNormalizedVersion(result.stdout) ?? '';
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error Happened while opening ${error.message}`);
      }
      return null;
    }
  }
  async isAvailable(): Promise<boolean> {
    const isAvailable = await this.getVersion();
    return isAvailable !== null;
  }

  async check(): Promise<DependencyStatus> {
    try {
      const result = await this.processRunner.run('ffmpeg', ['-version']);

      if (!result.success || !result.stdout) {
        return {
          name: 'ffmpeg',
          version: null,
          isAvailable: false,
          error: result.stderr.trim(),
        };
      }

      return {
        name: 'ffmpeg',
        version: this.getNormalizedVersion(result.stdout.trim()),
        isAvailable: true,
      };
    } catch (error) {
      let errorMessage = '';
      if (error instanceof Error) {
        console.log(`[Error]: Error happened while checking [FFMPEG] ${error.message}`);
        errorMessage = error.message;
      }
      return {
        name: '',
        version: null,
        isAvailable: false,
        error: errorMessage,
      };
    }
  }

  private getNormalizedVersion(version: string): string | null {
    const match = /^ffmpeg\s+version\s+([^\s-]+)/im.exec(version);
    return match?.[1] ?? null;
  }
}
