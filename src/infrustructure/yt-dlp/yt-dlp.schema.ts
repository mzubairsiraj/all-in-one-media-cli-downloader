import { z } from 'zod';

export const YtDlpFormatSchema = z.object({
    format_id: z.string(),
    ext: z.string().optional(),
    width: z.number().nullable().optional(),
    height: z.number().nullable().optional(),
    fps: z.number().nullable().optional(),
    vcodec: z.string().optional(),
    acodec: z.string().optional(),
    filesize: z.number().nullable().optional(),
    filesize_approx: z.number().nullable().optional(),
});

export const YtDlpMediaSchema = z.object({
    id: z.string(),
    title: z.string(),
    webpage_url: z.string().optional(),
    duration: z.number().nullable().optional(),
    uploader: z.string().nullable().optional(),
    channel: z.string().nullable().optional(),
    thumbnail: z.string().nullable().optional(),
    extractor: z.string().nullable().optional(),

    formats: z.array(YtDlpFormatSchema).default([]),
});

export type YtDlpMedia = z.infer<typeof YtDlpMediaSchema>;
 