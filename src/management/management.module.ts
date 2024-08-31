import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StaffModule } from './staff/staff.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtService } from '@nestjs/jwt';
import { StaffController } from './staff/staff.controller';

@Module({
  imports: [StaffModule, AuthModule],
  providers: [JwtService],
})
export class ManagementModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // TODO: Apply JwtMiddleware to all routes expect auth - instead of writing the same code for each controller
    consumer.apply(JwtMiddleware).exclude('auth/*').forRoutes(StaffController);
  }
}
