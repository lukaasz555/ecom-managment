import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const secret = this._configService.get('JWT_SECRET_TOKEN');
      const decodedToken = await this._jwtService.verifyAsync(token, {
        secret,
      });
      req['userData'] = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
