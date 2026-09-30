import { DependencyStatus } from '../../types/index.js';
import ProcessRunner from '../process-runner.js';
import { YtDlpMediaSchema, type YtDlpMedia } from './yt-dlp.schema.js';

export class YtDlpService {
    constructor(private readonly processRunner: ProcessRunner) {}

    async getVersion(): Promise<string | null> {
        const result = await this.processRunner.run('yt-dlp', ['--version']);

        if (!result.success || !result.stdout) {
            return null;
        }

        return result.stdout.trim();
    }

    async isAvailable(): Promise<boolean> {
        const version = await this.getVersion();
        return version !== null;
    }

    private async getRawMetaData(url: string): Promise<string | null> {
        const rawMetaData = await this.processRunner.run('yt-dlp', ['-J', '--no-playlist', url]);

        if (!rawMetaData.success) {
            throw new Error(
                rawMetaData.stderr || 'Failed to extract raw metadata from the provided URL.',
            );
        }

        if (!rawMetaData.stdout) {
            throw new Error('No metadata was returned from the provided URL.');
        }

        return rawMetaData.stdout;
    }

    async getMetaData(url: string): Promise<YtDlpMedia> {
        const rawMetaData = (await this.getRawMetaData(url)) ?? '';

        let parsed: unknown;
        try {
            parsed = JSON.parse(rawMetaData);
        } catch {
            throw new Error(`yt-dlp return invalid json`);
        }

        const result = YtDlpMediaSchema.safeParse(parsed);
        if (!result.success) {
            throw new Error('yt-dlp metadata does not match the expected structure.');
        }

        return result.data;
    }

    async check(): Promise<DependencyStatus> {
        const result = await this.processRunner.run('yt-dlp', ['--version']);

        if (!result.success || !result.stdout) {
            return {
                name: 'yt-dlp',
                version: null,
                isAvailable: false,
                error: result.stderr.trim() || 'Failed to get yt-dlp version',
            };
        }

        return {
            name: 'yt-dlp',
            version: result.stdout.trim() || null,
            isAvailable: true,
        };
    }
}
