import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}
}
