export type MediaFormatKind = 'video-audio' | 'video-only' | 'audio-only' | 'unknown';

export interface MediaFormat {
    id: string;
    extension?: string;
    width?: number | null;
    height?: number | null;
    fps?: number | null;
    videoCodec?: string;
    audioCodec?: string;
    fileSize?: number | null;
}

export interface MediaInfo {
    id: string;
    title: string;
    url?: string;
    durations?: number | null;
    creator?: string | null;
    thumbnail?: string | null;
    source?: string;
    formats: MediaFormat[];
}
