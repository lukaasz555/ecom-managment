import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // console.log('TOKEN -> ', token);

    if (!token) return false;

    const { role, privileges } = this._jwtService.decode(token);

    // const secret = this._configService.get('JWT_SECRET_TOKEN');
    // try {
    //   const isValid = this._jwtService.verify(token, {
    //     secret,
    //   });
    //   //   console.log('isValid = ', isValid);
    // } catch (err) {
    //   console.log('err VERIFY', err);
    // }
    if (!role || !privileges) return false;

    // return validateAccess(); TODO: implement
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
