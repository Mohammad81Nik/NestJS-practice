import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { LoggerMiddleware } from './logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import { expressLogger } from 'custom-logger-middleware';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [UsersModule, BlogsModule, ErrorsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  //  this is how we apply multiple middleware to our project
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware,
        expressLogger(),
        cors({
          origin: 'http://localhost:3000',
        }),
        helmet(),
      )
      .forRoutes('/blogs');
  }
}
