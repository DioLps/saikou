import { Component } from '@angular/core';
import { AnimesService } from './animes.service';
import { Router } from '@angular/router';

export interface AnimesData {
  animes: Array<AnimeData>;
}

export interface AnimeData {
  hash: number;
  title: string;
  genre: string;
  videos: number;
  cover: string;
  type: string;
  slug: string;
}
@Component({
  selector: 'saikou-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent {
  public response: AnimesData = null;
  public filteredList: Array<AnimeData> = [];
  public isLoading = false;
  public selectedPage = 1;
  public pager: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    startPage: number;
    endPage: number;
    startIndex: number;
    endIndex: number;
    pages: number[];
  };

  constructor(private aServ: AnimesService, private router: Router) {
    this.isLoading = true;
    this.aServ.getAnimes().subscribe((anime: AnimesData) => {
      this.response = anime;
      this.setPage(this.selectedPage);
      this.isLoading = false;
    });
  }

  public getNextPage(nextPage: number) {
    this.isLoading = true;
    this.selectedPage = nextPage;
    this.setPage(this.selectedPage);
    this.isLoading = false;
  }

  public goToDetail(slug: string) {
    this.router.navigateByUrl(`/animes/details/${slug}`);
  }

  public setPage(page: number) {
    // get pager object from service
    this.pager = this.aServ.getPager(this.response.animes.length, page);

    // get current page of items
    this.filteredList = this.response.animes.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  public setColor(position) {
    console.log(position, this.selectedPage);

    // selectedPage == (position + 1) ? 'warn': ''
  }
}
