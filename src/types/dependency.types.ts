export interface DependencyStatus {
  name: string;
  isAvailable: boolean;
  version: string | null;
  error?: string;
}

export interface DependencyCheckerStatus {
  ready: boolean;
  dependencies: DependencyStatus[];
}
