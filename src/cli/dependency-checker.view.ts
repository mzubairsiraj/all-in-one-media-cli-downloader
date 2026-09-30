import ora, { type Ora } from 'ora';
import { DependencyCheckerStatus } from '../types/dependency.types.js';

export function startDependencyCheckSpinner(): Ora {
  return ora('Checking System Dependencies').start();
}

export function renderDedencyCheckerView(dependencyResult: DependencyCheckerStatus): void {
  console.log();

  for (const dependency of dependencyResult.dependencies) {
    if (dependency.isAvailable) {
      console.log(`✓ ${dependency.name} v-${dependency.version}`);
    } else {
      console.log(`✗ ${dependency.name}`);
    }

    if (dependency.error) {
      console.log(`[ERROR]: ${dependency.error}`);
    }

    console.log();
  }

  if (dependencyResult.ready) {
    console.log(`System Ready`);
  } else {
    console.log('System is not ready to processed!');
  }
}
