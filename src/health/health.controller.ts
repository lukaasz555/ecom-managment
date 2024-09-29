import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DbHealthIndicator } from './db-health.indicator';

@Controller('health')
export class HealthController {
  constructor(
    private _health: HealthCheckService,
    private _dbHealthIndicator: DbHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this._health.check([
      () => this._dbHealthIndicator.isHealthy('database'),
    ]);
  }
}
