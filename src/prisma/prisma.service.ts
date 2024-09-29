import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly _logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this._logger.log('PrismaService - connected to the database');
    } catch (err) {
      this._logger.error(
        'PrismaService - connecting to the database error',
        err,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
