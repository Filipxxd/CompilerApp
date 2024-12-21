import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { CompilerResponse } from "../models/compiler.api";
import { CompilerRequest } from "../models/compiler.api";

@Injectable({
  providedIn: "root",
})
export class CompilerApiService {
  constructor(private http: HttpClient) {}

  compileCode(data: CompilerRequest): Observable<CompilerResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'code-compiler10.p.rapidapi.com',
      'x-rapidapi-key': environment.apiKey,
      'x-compile': 'rapidapi',
    });

    return this.http.post<CompilerResponse>(environment.apiUrl, {
      code: data.code,
      lang: data.language,
      input: data.input,
    }, { headers });
  }
}
