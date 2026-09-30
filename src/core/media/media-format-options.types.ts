import { MediaFormat } from "../../types/media.types.js";



export type MediaFormatOptionKind = "video" | "audio";


export interface MediaFormatOption {
    kind: MediaFormatOptionKind;
    label: string;
    height?: number | null;
    formats: MediaFormat[];
}

