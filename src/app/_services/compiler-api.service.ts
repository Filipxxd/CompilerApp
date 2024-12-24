import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CompilerResponse } from "../_models/compiler.api";
import { CompilerRequest } from "../_models/compiler.api";
import { Language } from "../_models/languages";

@Injectable({
  providedIn: "root",
})
export class CompilerApiService {
  constructor(private http: HttpClient) {}

  compileCode(data: CompilerRequest): Observable<CompilerResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-host': environment.apiHost,
      'x-rapidapi-key': environment.apiKey,
      'x-compile': 'rapidapi',
    });

    return this.http.post<CompilerResponse>(environment.apiUrl, {
      code: data.code,
      lang: this.getProgrammingLanguage(data.language),
      input: data.input,
    }, { headers });
  }

  private getProgrammingLanguage(lang: Language): string{
    switch (lang) {
      case Language.PHP:
        return 'php';
      case Language.PYTHON:
        return 'python';
      case Language.C:
        return 'c';
      case Language.C_CPP:
        return 'c_cpp';
      case Language.CSHARP:
        return 'csharp';
      case Language.KOTLIN:
        return 'kotlin';
      case Language.GOLANG:
        return 'golang';
      case Language.R:
        return 'r';
      case Language.JAVA:
        return 'java';
      case Language.TYPESCRIPT:
        return 'typescript';
      case Language.NODEJS:
        return 'nodejs';
      case Language.RUBY:
        return 'ruby';
      case Language.PERL:
        return 'perl';
      case Language.SWIFT:
        return 'swift';
      case Language.FORTRAN:
        return 'fortran';
      case Language.BASH:
        return 'bash';
      default:
        throw new Error('Unknown language');
    }
  }
}
