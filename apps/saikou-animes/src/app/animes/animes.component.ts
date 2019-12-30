import { Component } from '@angular/core';
import { AnimesService } from './animes.service';
import { Router } from '@angular/router';

export interface AnimesData {
  nextPage: number;
  animes: Array<{ title: string; slug: string; src: string }>;
}

@Component({
  selector: 'saikou-animes',
  templateUrl: './animes.component.html',
  styleUrls: ['./animes.component.scss']
})
export class AnimesComponent {
  public response: AnimesData = null;
  public isLoading = false;

  constructor(private aServ: AnimesService, private router: Router) {
    this.isLoading = true;
    this.aServ.getAnimesPaged().subscribe((anime: AnimesData) => {
      this.response = anime;
      this.isLoading = false;
    });
  }

  public getNextPage(nextPage: number) {
    this.isLoading = true;
    this.aServ.getAnimesPaged(nextPage).subscribe((anime: AnimesData) => {
      this.response.nextPage = anime.nextPage;
      this.response.animes.push(...anime.animes);
      this.isLoading = false;
    });
  }

  public goToDetail(slug: string) {
    this.router.navigateByUrl(`/animes/details/${slug}`);
  }
}
