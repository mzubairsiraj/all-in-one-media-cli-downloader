#!/usr/bin/env node

import  ProcessRunner  from './infrustructure/process-runner.js';
import {YtDlpService} from './infrustructure/yt-dlp/yt-dlp.service.js';   
import { FfmpegService } from './infrustructure/ffmpeg/ffmpeg.services.js';




const ytDlpService = new YtDlpService(new ProcessRunner());

const ffmpeg = new FfmpegService(new ProcessRunner())


console.log(await ffmpeg.getVersion());




