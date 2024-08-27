import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ManagementModule,
    StoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
