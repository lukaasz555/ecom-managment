import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly _logger = new Logger('AppService');

  getHello(): string {
    this._logger.log('app service - base route');
    return 'Hello World!';
  }
}
