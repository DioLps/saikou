import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AnimesData, PagerData } from './animes.model';

@Injectable({ providedIn: 'root' })
export class AnimeService {
  private endpoint = 'http://localhost:3000/anime';
  constructor(private httpClient: HttpClient) {}

  public getAnimes() {
    return this.httpClient.get(this.endpoint).pipe(
      map((values: AnimesData) => {
        values.animes = values.animes
          .filter(anime => anime.hash)
          .map(anime => {
            anime.cover = 'https://goyabu.com/' + anime.cover;
            return anime;
          });
        return values;
      })
    );
  }

  public getDetailsAnime(hash: number) {
    return this.httpClient.get(`${this.endpoint}/detail/${hash}`);
  }

  public getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 20
  ): PagerData {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      i => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
