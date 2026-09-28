import ProcessRunner from '../process-runner.js';
// import type {dependencyStatus} from "../../types/dependency.types.js"

export class FfmpegService {
  constructor(private readonly processRunner: ProcessRunner) {}

  async getVersion(): Promise<string | null> {
    try {
      let result = await this.processRunner.run('ffmpeg', ['-version']);

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

  private getNormalizedVersion(version: string): string | null {
    if (typeof version === 'string') {
      return version.trim().split(' ')[2]?.split('-')[0] as string;
    }
    return null;
  }
}
