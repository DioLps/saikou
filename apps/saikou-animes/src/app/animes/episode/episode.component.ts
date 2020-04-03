import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetEpisode } from './store/episode.actions';
import { Subscription } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { SetTitle } from '../../store/app.actions';

@Component({
  selector: 'saikou-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit, OnDestroy {
  public episode = null;
  public myRouteSub: Subscription;
  public myStoreSub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.getEpisode();
  }

  public ngOnInit(): void {
    this.myRouteSub = this.activatedRoute.params.subscribe(p => {
      this.episode = null;
      this.store.dispatch(
        new GetEpisode(this.activatedRoute.snapshot.params.slug)
      );
    });
  }

  public ngOnDestroy(): void {
    this.episode = null;
    this.myRouteSub.unsubscribe();
    this.myStoreSub.unsubscribe();
  }

  public getEpisode() {
    this.myStoreSub = this.store
      .select(state => state.episode)
      .subscribe(response => {
        if (response && response.episode) {
          this.episode = response.episode;
          this.store.dispatch(
            new SetTitle('Saikou Animes ' + this.episode.mainLabel)
          );
        } else {
          this.episode = null;
        }
      });
  }

  public goToEpisode(page) {
    this.store.dispatch([
      new Navigate([`/animes/episode/${this.getKeyFromPage(page)}`])
    ]);
  }

  public getKeyFromPage(page: any) {
    const key = page.url.replace('https://goyabu.com/videos/', '');
    return key.replace('/', '');
  }

  public goBack() {
    this.store.dispatch(new Navigate([`/animes`]));
  }
}
