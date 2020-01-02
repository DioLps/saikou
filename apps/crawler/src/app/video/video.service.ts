import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { MessagesError } from '../../utils';

import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

@Injectable()
export class VideoService {
  public getVideo(key: number) {
    return rp(
      `${environment.video_path}/${key}`,
      environment.requestOptions
    ).then(response => {
      if (!response) {
        return {
          err: true,
          msg: MessagesError.VIDEO_NOT_FOUND
        };
      }

      const $ = cheerio.load(response);
      return {
        main: this.getMainVideo($('.page.p-video > script')),
        mainLabel: this.getMainLabel($('h1[itemprop="name"]')),
        pageControl: this.getPageControl($('.aaa>a[rel]'))
      };
    });
  }

  private getMainLabel(element) {
    return 'Assistindo' + element.text();
  }

  private getPageControl(element) {
    try {
      return element.toArray().map(link => {
        return {
          url: link.attribs.href,
          type: link.attribs.rel
        };
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private getMainVideo(element) {
    // TODO
    // Validar possiblidade de fallback
    try {
      const lastElement = element.toArray().pop().lastChild.data;
      const fromKey = "emphasis += \"<source type='video/mp4' src='";
      const untilKey = `' />";\nemphasis += `;
      const from = lastElement.indexOf(fromKey) + fromKey.length;
      const until = lastElement.indexOf(untilKey);
      return lastElement.substring(from, until);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
