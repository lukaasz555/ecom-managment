import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private _logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    this._logger.log(`${req.method} - ${req.originalUrl} - ${res.statusCode}`);
    next();
  }
}
