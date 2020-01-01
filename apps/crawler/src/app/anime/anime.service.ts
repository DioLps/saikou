import { Injectable } from '@nestjs/common';
import * as rp from 'request-promise';
import { environment } from '../../environments/environment';
import { MessagesError } from '../../utils';

@Injectable()
export class AnimeService {
  getData(): any {
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
}
