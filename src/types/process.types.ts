export interface ProcessResult {
  stdout: string;
  stderr: string;
  code: number | null;
  success: boolean;
}
