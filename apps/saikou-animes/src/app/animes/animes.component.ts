import { Component } from '@angular/core';
import { AnimeService } from './store/animes.service';
import { Router } from '@angular/router';
import { AnimesData, AnimeData } from './store/animes.model';
import { Store } from '@ngxs/store';
import { GetAnimes, GetDetailAnime } from './store/animes.actions';
import { Navigate } from '@ngxs/router-plugin';
import { GetEpisodesDetails } from './details/store/details.actions';
import { SetTitle } from '../store/app.actions';
@Component({
  selector: 'saikou-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent {
  public response: AnimesData;
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

  constructor(private aServ: AnimeService, private store: Store) {
    this.isLoading = true;
    this.store
      .select(state => state.animes)
      .subscribe(anime => {
        if (anime) {
          this.response = anime;
          this.setPage(this.selectedPage);
          this.isLoading = false;
        }
      });
    this.store.dispatch(new GetAnimes());
    this.store.dispatch(new SetTitle('Saikou Animes'));
  }

  public getNextPage(nextPage: number) {
    this.isLoading = true;
    this.selectedPage = nextPage;
    this.setPage(this.selectedPage);
    this.isLoading = false;
    window.scrollTo(0, 0);
  }

  public goToDetail(anime: AnimeData) {
    this.store.dispatch([
      new GetDetailAnime(anime),
      new Navigate([`/animes/details/${anime.hash}`]),
      new GetEpisodesDetails({ slug: anime.slug, page: 1 })
    ]);
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
}
