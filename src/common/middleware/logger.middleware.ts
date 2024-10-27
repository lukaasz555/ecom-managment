import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from 'nestjs-pino';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private _logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        this._logger.error(
          `${req.method} - ${req.originalUrl} - ${res.statusCode}`,
        );
      }
    });
    next();
  }
}
