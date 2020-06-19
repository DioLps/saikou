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
        pageControl: this.getPageControl($('.subitem>a[rel]'))
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
      const untilKeyWithoutBreakline = `' />"; emphasis += `;
      const fromKeyTypeFunc = `, file: "`;
      const untilKeyTypeFunc = `"},],\n}],playbackRateControls`;
      const untilKeyTypeFuncWithoutBreakline = `function($)`;
      const from = this.getIndexFrom(lastElement, fromKey);
      const until = this.getIndexUntil(lastElement, untilKey);
      let firstCall: string = lastElement.substring(from, until);
      if (firstCall.includes(untilKeyWithoutBreakline)) {
        firstCall = firstCall.substring(
          0,
          firstCall.indexOf(untilKeyWithoutBreakline)
        );
      }
      if (firstCall.includes(untilKeyTypeFuncWithoutBreakline)) {
        const fromTypeFunc = this.getIndexFrom(lastElement, fromKeyTypeFunc);
        const untilTypeFunc = this.getIndexUntil(lastElement, untilKeyTypeFunc);
        firstCall = lastElement.substring(fromTypeFunc, untilTypeFunc);
        firstCall = firstCall.replace('"', '');
      }
      return firstCall;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private getIndexFrom(lastElement: string, fromkey: string): number {
    return lastElement.indexOf(fromkey) + fromkey.length;
  }

  private getIndexUntil(lastElement: string, untilKey: string): number {
    return lastElement.indexOf(untilKey);
  }
}
