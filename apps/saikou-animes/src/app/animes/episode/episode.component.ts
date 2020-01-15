import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetEpisode } from './store/episode.actions';
import { Subscription } from 'rxjs';
import { AnimeData } from '../store/animes.model';
import { Navigate } from '@ngxs/router-plugin';
import { SetTitle } from '../../store/app.actions';

@Component({
  selector: 'saikou-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit, OnDestroy {
  public episode = null;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.getEpisode();
  }

  public myStoreSub: Array<Subscription> = [];

  ngOnInit() {
    this.store.dispatch(
      new GetEpisode(this.activatedRoute.snapshot.params.slug)
    );
  }

  ngOnDestroy() {
    this.myStoreSub.forEach(sub => sub.unsubscribe());
  }

  public getEpisode() {
    const mySub = this.store
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
    this.myStoreSub.push(mySub);
  }

  public goToEpisode(page) {
    let key = page.url.replace('https://goyabu.com/video/', '');
    key = key.replace('/', '');

    this.store
      .dispatch([new Navigate([`/animes`])])
      .toPromise()
      .then(() => {
        this.store.dispatch([
          new Navigate([`/animes/episode/${key}`]),
          new GetEpisode(this.activatedRoute.snapshot.params.slug)
        ]);
      });
  }

  public goBack() {
    this.store.dispatch(new Navigate([`/animes`]));
  }
}
