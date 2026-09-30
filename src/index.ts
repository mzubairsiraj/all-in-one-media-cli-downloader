#!/usr/bin/env node

import ProcessRunner from './infrustructure/process-runner.js';
import { YtDlpService } from './infrustructure/yt-dlp/yt-dlp.service.js';
import { FfmpegService } from './infrustructure/ffmpeg/ffmpeg.services.js';
import { DependencyChecker } from './infrustructure/dependency-checker/dependency-checker.service.js';
import {
  renderDedencyCheckerView,
  startDependencyCheckSpinner,
} from './cli/dependency-checker.view.js';

const ytDlpService = new YtDlpService(new ProcessRunner());

const ffmpeg = new FfmpegService(new ProcessRunner());

const dependencyChecker = new DependencyChecker(ytDlpService, ffmpeg);

const spinner = startDependencyCheckSpinner();

renderDedencyCheckerView(await dependencyChecker.checkAll());
spinner.stop();
