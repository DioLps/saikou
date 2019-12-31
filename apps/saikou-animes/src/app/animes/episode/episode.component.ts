import { Component, OnInit } from '@angular/core';
import { EpisodeService } from './episode.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'saikou-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {
  private episode = null;
  constructor(
    private epiServ: EpisodeService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.epiServ
      .getAnimeEpisode(this.activatedRoute.snapshot.params.slug)
      .subscribe((response: any) => {
        this.episode = response.urls;
      });
  }
}
