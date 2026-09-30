import { YtDlpMedia } from '../infrustructure/yt-dlp/yt-dlp.schema.js';
import { MediaFormat, MediaInfo } from '../types/media.types.js';

export class MediaMapper {
    static toMediaInfo(mediaInfo: YtDlpMedia): MediaInfo {
        return {
            id: mediaInfo.id,
            title: mediaInfo.title || "",
            url: mediaInfo.webpage_url || "",
            durations: mediaInfo.duration || null,
            creator: (mediaInfo.uploader ?? mediaInfo.channel) || null,
            thumbnail: mediaInfo.thumbnail || null,
            source: mediaInfo.extractor || "",
            formats: mediaInfo.formats.map(format => MediaMapper.toMediaFormat(format))
        };
    }

    static toMediaFormat(format: YtDlpMedia['formats'][number]): MediaFormat {
        return {
            id: format.format_id,
            extension: format.ext ?? '',
            width: format.width || null,
            height: format.height || null,
            fps: format.fps || null,
            videoCodec: format.vcodec || "",
            audioCodec: format.acodec || "",
            fileSize: (format.filesize ?? format.filesize_approx) || 0 
        };
    }
}
