export type ExecutionResult = {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: any;
    output: string;
  };
};
