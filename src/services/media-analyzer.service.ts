import { YtDlpService } from '../infrustructure/yt-dlp/yt-dlp.service.js';
import { MediaMapper } from '../mappers/media.mapper.js';
import { MediaInfo } from '../types/media.types.js';

export class MediaAnalyzer {
    constructor(private readonly ytDlpService: YtDlpService) {}

    async analyze(url: string): Promise<MediaInfo> {
        const mediaInfoResult = await this.ytDlpService.getMetaData(url);
        return MediaMapper.toMediaInfo(mediaInfoResult);
    }
}
