import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AnimeData } from '../store/animes.model';
import { GetEpisodesDetails } from './store/details.actions';
import {
  SetFavoriteAnime,
  IsThisAFavoriteAnime
} from '../../favorites/store/favorites.actions';
import { SetTitle } from '../../store/app.actions';

@Component({
  selector: 'saikou-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public details = null;
  public epiObject = null;
  public myStoreSub: Array<Subscription> = [];
  private slug: string;
  public isFavorite = false;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getDetailsAnime();
    this.getDetailsEpisodes();
  }

  ngOnDestroy() {
    this.myStoreSub.forEach(sub => sub.unsubscribe());
  }

  public getDetailsAnime() {
    this.slug = this.activatedRoute.snapshot.params.slug;
    this.verifyFavorite();
    const mySubDetail = this.store
      .select(state => state.animes)
      .subscribe(response => {
        if (response) {
          this.details = null;
          this.details = response.animes.find(
            (anime: AnimeData) => anime.hash === Number(this.slug)
          );
          if (this.details === undefined) {
            this.goBack();
          } else {
            this.store.dispatch(
              new SetTitle('Saikou Animes ' + this.details.title)
            );
          }
        }
      });
    this.myStoreSub.push(mySubDetail);
  }

  private verifyFavorite() {
    this.store.dispatch(new IsThisAFavoriteAnime({ hash: this.slug }));
    const mySubDetail = this.store
      .select(state => state.favorites.isFavorite)
      .subscribe(isFavorite => {
        this.isFavorite = isFavorite;
      });
    this.myStoreSub.push(mySubDetail);
  }

  public getDetailsEpisodes() {
    const mySub = this.store
      .select(state => state.details)
      .subscribe(response => {
        this.epiObject = null;
        this.epiObject = response.details;
        if (this.epiObject === undefined) {
          this.goBack();
        }
      });
    this.myStoreSub.push(mySub);
  }

  public goToVideo(epi) {
    this.store.dispatch(new Navigate([`/animes/episode/${epi.slug}`]));
  }

  public goBack() {
    this.store.dispatch(new Navigate([`/animes`]));
  }

  public goToPage(page: any) {
    this.store
      .dispatch(new GetEpisodesDetails({ slug: this.details.slug, page }))
      .toPromise()
      .then(() => {
        window.scrollTo(0, 420);
      });
  }

  public setFavorite() {
    this.store.dispatch(
      new SetFavoriteAnime({
        hash: this.slug
      })
    );
    this.verifyFavorite();
  }
}
