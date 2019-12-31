import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AnimeData } from '../store/animes.model';

@Component({
  selector: 'saikou-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public details = null;
  public myStoreSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.getDetailsAnime();
  }

  ngOnDestroy() {
    this.myStoreSub.unsubscribe();
  }

  public getDetailsAnime() {
    const slug = this.activatedRoute.snapshot.params.slug;
    this.myStoreSub = this.store
      .select(state => state.animes)
      .subscribe(response => {
        if (response) {
          this.details = response.animes.find((anime: AnimeData) => {
            return anime.hash === parseInt(slug);
          });
          if (this.details === undefined) {
            this.goBack();
          }
        }
      });
  }

  public goToVideo(epi) {
    this.route.navigateByUrl(`/animes/episode/${epi.slug}`);
  }

  public goBack() {
    this.store.dispatch(new Navigate([`/animes`]));
  }
}
