import { MediaFormat } from '../../types/media.types.js';
import { MediaFormatOption } from './media-format-options.types.js';
import { MediaFormatClassifer } from './media-format.classifer.js';

export class MediaFormatOptionBuilder {
    static build(formats: MediaFormat[]): MediaFormatOption[] {
        const videoOptions = MediaFormatOptionBuilder.buildVideoOptions(formats);
        const audioOptions = MediaFormatOptionBuilder.buildAudioOption(formats);

        return audioOptions ? [...videoOptions, audioOptions] : videoOptions;
    }

    static buildVideoOptions(formats: MediaFormat[]): MediaFormatOption[] {
        const groupedByHeight = new Map<number, MediaFormat[]>();

        for (const format of formats) {
            if (!MediaFormatClassifer.hasVideo(format)) {
                continue;
            }
            if (!format.height) {
                continue;
            }

            let existing = groupedByHeight.get(format.height) ?? [];
            existing.push(format);

            groupedByHeight.set(format.height, existing);
        }

        return [...groupedByHeight.entries()]
            .sort(([heightA], [heightB]) => heightB - heightA)
            .map(([height, groupedFormats]) => ({
                kind: 'video',
                height,
                label: `${height}p`,
                formats: groupedFormats,
            }));
    }

    static buildAudioOption(formats: MediaFormat[]): MediaFormatOption | null {
        const audioFormats = formats.filter(
            (format) => MediaFormatClassifer.getKind(format) === 'audio-only',
        );

        if (audioFormats.length === 0) {
            return null;
        }

        return {
            kind: 'audio',
            label: 'Audio Only',
            formats: audioFormats,
        };
    }
}
