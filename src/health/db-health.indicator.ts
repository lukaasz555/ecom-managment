import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class DbHealthIndicator extends HealthIndicator {
  constructor(private _prismaService: PrismaService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this._prismaService.$queryRaw`SELECT 1;`;
      return this.getStatus(key, true);
    } catch (err) {
      return this.getStatus(key, false, { message: err.message });
    }
  }
}
