import { MediaFormat, MediaFormatKind } from '../../types/media.types.js';

export class MediaFormatClassifer {
    static hasVideo(format: MediaFormat): boolean {
        return Boolean(format.videoCodec && format.videoCodec !== 'none');
    }
    static hasAudio(format: MediaFormat): boolean {
        return Boolean(format.audioCodec && format.audioCodec !== 'none');
    }

    static getKind(format: MediaFormat): MediaFormatKind {
        const hasVideo = MediaFormatClassifer.hasVideo(format);
        const hasAudio = MediaFormatClassifer.hasAudio(format);

        if (hasVideo && hasAudio) {
            return 'video-audio';
        }

        if (hasVideo) {
            return 'video-only';
        }
        if (hasAudio) {
            return 'audio-only';
        }

        return 'unknown';
    }

    static getResolution(format: MediaFormat): string | null {
        if (format.width && format.height) {
            return `${format.width}x${format.height}`;
        }
        if (format.width) {
            return `${format.width}x?`;
        }
        if (format.height) {
            return `?x${format.height}`;
        }
        return 'N/A';
    }

    static getLabel(format: MediaFormat): string {
        const kind = MediaFormatClassifer.getKind(format);
        const resolution = MediaFormatClassifer.getResolution(format);

        if (kind === 'audio-only') {
            return `${format.extension?.toUpperCase() || 'N/A'} - | Audio Only`;
        }

        if (kind === 'video-only') {
            return `${format.extension?.toUpperCase() || 'N/A'} | ${resolution} | Video Only`;
        }

        if (kind === 'video-audio') {
            return `${format.extension?.toUpperCase() || 'N/A'} | ${resolution} | Video + Audio`;
        }
        return `${format.extension?.toUpperCase() || 'N/A'} | Unknown Format`;
    }
}
