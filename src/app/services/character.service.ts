import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { ApiResult, type Result } from './interfaces';

const BASE_URL = 'https://rickandmortyapi.com/api';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);

  constructor() {}

  getCharacters(page = 1): Observable<ApiResult> {
    return this.http
      .get<ApiResult>(`${BASE_URL}/character/?page=${page}`)
      .pipe(
        // This is to simulate a slow network for other features to take effect
        delay(2000)
      );
  }

  getCharacterDetails(id: string): Observable<Result> {
    return this.http.get<Result>(`${BASE_URL}/character/${id}`);
  }
}
