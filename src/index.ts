#!/usr/bin/env node

import { MediaFormatClassifer } from './core/media/media-format.classifer.js';
import { YtDlpService } from './infrustructure/yt-dlp/yt-dlp.service.js';
import ProcessRunner from './infrustructure/process-runner.js';
import { MediaAnalyzer } from './services/media-analyzer.service.js';
import { MediaFormatOptionBuilder } from './core/media/media-format-option.builder.js';

const processRunner = new ProcessRunner();
const ytDlpService = new YtDlpService(processRunner);
const mediaAnalyzer = new MediaAnalyzer(ytDlpService);

const url = 'https://youtu.be/aSWyN7kUcXM?si=BbLGHDoIbwZm0K_E';

try {
    const mediaData = await mediaAnalyzer.analyze(url);
    console.log(mediaData.id, mediaData.title, mediaData.formats.length);

    const options = MediaFormatOptionBuilder.build(mediaData.formats);

    for (const option of options) {
        console.log({
            kind: option.kind,
            label: option.label,
            totalOption: option.formats.length,
        });
    }
} catch (error) {
    let message = error instanceof Error ? error.message : '[ERROR]: Media Analysis failed';
    console.error(message);
    process.exitCode = 1;
}
