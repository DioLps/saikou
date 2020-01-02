import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AnimeData } from '../store/animes.model';
import { GetEpisodesDetails } from './store/details.actions';

@Component({
  selector: 'saikou-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public details = null;
  public epiObject = null;
  public myStoreSub: Array<Subscription> = [];

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
    const slug = this.activatedRoute.snapshot.params.slug;
    const mySub = this.store
      .select(state => state.animes)
      .subscribe(response => {
        if (response) {
          this.details = null;
          this.details = response.animes.find(
            (anime: AnimeData) => anime.hash === parseInt(slug)
          );
          if (this.details === undefined) {
            this.goBack();
          }
        }
      });
    this.myStoreSub.push(mySub);
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
}
