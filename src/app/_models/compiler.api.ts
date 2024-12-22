import { Language } from "./languages";

export type CompilerRequest = {
  language: Language;
  code: string;
  input: string;
}

export type CompilerResponse = {
    output: string,
}
