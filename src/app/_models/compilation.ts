import { CompilerRequest, CompilerResponse } from "./compiler.api";

export type Compilation = {
  id: string;
  title: string;
  request: CompilerRequest;
  response: CompilerResponse;
  timestamp: Date;
}