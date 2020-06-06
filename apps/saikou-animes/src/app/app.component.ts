import {
  Component,
  ViewChild,
  ElementRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription, Subject } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import {
  GetDetailAnime,
  SetAnimes,
  GetAnimes
} from './animes/store/animes.actions';
import { AnimeData } from './animes/store/animes.model';
import { GetEpisodesDetails } from './animes/details/store/details.actions';
import { Navigate } from '@ngxs/router-plugin';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'saikou-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  public animes = [];
  public searchResults = [];
  public isSearchHide = true;
  public isLoading = false;
  public searchSubs: Subscription;
  public searchAction = new Subject<any>();
  public searchTerm = '';

  constructor(private store: Store) {
    this.store
      .select(state => state.animes)
      .subscribe(state => {
        this.animes = state.animes;
      });
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetAnimes());
  }

  public ngOnDestroy(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.isLoading = false;
    this.searchSubs.unsubscribe();
  }

  public search(event): void {
    this.searchResults = [];
    this.isLoading = true;
    this.searchAction.next(event);
  }

  public changeSearch(): void {
    this.isSearchHide = !this.isSearchHide;
    if (!this.isSearchHide) {
      this.searchSubs = this.searchAction
        .pipe(
          filter(Boolean),
          debounceTime(350),
          distinctUntilChanged(),
          tap(text => {
            this.filterByTerm();
          })
        )
        .subscribe();
    } else {
      this.searchTerm = '';
      this.searchResults = [];
      this.isLoading = false;
      this.searchSubs.unsubscribe();
    }
  }

  public goToDetail(anime: AnimeData) {
    this.changeSearch();
    this.store.dispatch([
      new SetAnimes({ animes: [] }),
      new GetDetailAnime(anime),
      new Navigate([`/animes/details/${anime.hash}`]),
      new GetEpisodesDetails({ slug: anime.slug, page: 1 })
    ]);
  }

  public filterByTerm() {
    this.searchResults = this.animes.filter(anime => {
      const loweCaseTitle: string = anime.title.toLowerCase();
      const lowerCaseTerm: string = this.searchTerm.toLowerCase();
      return loweCaseTitle.includes(lowerCaseTerm);
    });
    this.isLoading = false;
  }

  public menuAction(action: string, drawer: MatDrawer) {
    drawer.toggle();
    this.store.dispatch(new Navigate([action]));
  }
}
