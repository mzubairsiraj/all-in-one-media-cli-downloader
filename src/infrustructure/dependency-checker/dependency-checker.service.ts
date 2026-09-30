import { DependencyCheckerStatus } from '../../types/dependency.types.js';
import { FfmpegService } from '../ffmpeg/ffmpeg.services.js';
import { YtDlpService } from '../yt-dlp/yt-dlp.service.js';

export class DependencyChecker {
  constructor(
    private readonly ytDlpService: YtDlpService,
    private readonly ffmpegService: FfmpegService,
  ) {}

  async checkAll(): Promise<DependencyCheckerStatus> {
    let dependencyCheckerResult: DependencyCheckerStatus;
    let isReady: boolean = true;

    try {
      const result = await Promise.all([this.ytDlpService.check(), this.ffmpegService.check()]);
      result.forEach((dependencyResult) => {
        if (!dependencyResult.isAvailable || !dependencyResult.version) {
          isReady = false;
        }
      });

      dependencyCheckerResult = {
        ready: isReady,
        dependencies: result,
      };
      return dependencyCheckerResult;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`[Error]: ${error.message}`);
      }
      return {
        ready: false,
        dependencies: [],
      };
    }
  }
}
