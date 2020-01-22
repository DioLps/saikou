import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { MessagesError } from '../../utils';

import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

@Injectable()
export class AnimeService {
  public getData(): any {
    return rp(environment.goyabu_api_show_all, environment.requestOptions).then(
      response => {
        if (!response) {
          return {
            err: true,
            msg: MessagesError.ANIMES_NOT_FOUND
          };
        }
        return {
          animes: JSON.parse(response)
        };
      }
    );
  }

  public getDetails(hash: number): any {
    return rp(
      environment.goyabu_api_show_detail + hash,
      environment.requestOptions
    ).then(response => {
      if (!response) {
        return {
          err: true,
          msg: MessagesError.DETAILS_NOT_FOUND
        };
      }
      return JSON.parse(response);
    });
  }

  public getEpisodes(slug: string, page: number = 1) {
    // https://goyabu.com/anime/black-clover/page/2/
    return rp(
      `${environment.base_path}/assistir/${slug}/page/${page}`,
      environment.requestOptions
    ).then(response => {
      if (!response) {
        return {
          err: true,
          msg: MessagesError.EPISODES_NOT_FOUND
        };
      }
      const $ = cheerio.load(response);
      let arr = null;
      const $el = $('.miau');
      const firstElement = $el.toArray().pop();
      const videos = $(firstElement).find('.video');
      console.log(firstElement)
      const naco = $(firstElement)
        .find('.naco')
        .toArray()
        .pop();
      let hasNext: any = false;
      let hasPrev: any = false;
      if (naco) {
        hasNext = naco.children.find(value =>
          value.attribs.class.includes('next')
        );
        hasPrev = naco.children.find(value =>
          value.attribs.class.includes('prev')
        );
      }

      if (videos.length) {
        arr = [];
        videos.each(function(index, el) {
          const ul = $(el).find('.stats')[0];
          const obj = {
            title: $(el)
              .find('.video-title')
              .text(),
            slug: $(el)
              .find('a')
              .attr('href')
              .split('/')
              .filter(String)
              .slice(-1)
              .pop(),
            image: $(el)
              .find('.clip img')
              .attr('src'),
            duration: $(el)
              .find('.timer')
              .text()
              .trim(),
            views: ul.childNodes[1].lastChild.data,
            date: ul.childNodes[2].lastChild.data
          };
          arr.push(obj);
        });
      }

      return {
        nextPage: hasNext ? Number(page) + 1 : false,
        prevPage: hasPrev ? Number(page) - 1 : false,
        episodes: arr
      };
    });
  }
}
