import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from '@src/prisma/prisma.service';
import { DbHealthIndicator } from './db-health.indicator';

@Module({
  imports: [TerminusModule],
  providers: [DbHealthIndicator, PrismaService],
  controllers: [HealthController],
})
export class HealthModule {}
