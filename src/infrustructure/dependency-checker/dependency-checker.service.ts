import { DependencyCheckerStatus } from '../../types/dependency.types.js';
import { FfmpegService } from '../ffmpeg/ffmpeg.services.js';
import { YtDlpService } from '../yt-dlp/yt-dlp.service.js';

export class DependencyChecker {
  constructor(
    private readonly ytDlpService: YtDlpService,
    private readonly ffmpegService: FfmpegService,
  ) {}

  async checkAll(): Promise<DependencyCheckerStatus> {
    const result = await Promise.all([this.ytDlpService.check(), this.ffmpegService.check()]);
    const isReady = result.every(
      (dependencyResult) => dependencyResult.isAvailable && Boolean(dependencyResult.version),
    );

    return {
      ready: isReady,
      dependencies: result,
    };
  }
}
