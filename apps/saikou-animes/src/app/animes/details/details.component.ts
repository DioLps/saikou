import { Component, OnInit } from '@angular/core';
import { DetailsService } from './details.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'saikou-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public details = null;
  public epiObject = null;

  constructor(
    private detailServ: DetailsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.detailServ
      .getAnimeDetails(this.activatedRoute.snapshot.params.slug)
      .subscribe((response: any) => {
        this.details = response.data;
        this.getAnimeEpisodes();
      });
  }
  public getAnimeEpisodes(page?: string) {
    if (page !== undefined) {
      this.detailServ
        .getAnimeEpisodes(this.activatedRoute.snapshot.params.slug, page)
        .subscribe((response: any) => {
          this.epiObject = response;
        });
    } else {
      this.detailServ
        .getAnimeEpisodes(this.activatedRoute.snapshot.params.slug)
        .subscribe((response: any) => {
          this.epiObject = response;
        });
    }
  }
}
