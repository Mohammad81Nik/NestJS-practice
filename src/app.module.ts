import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { LoggerMiddleware } from './logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import { expressLogger } from 'custom-logger-middleware';
import { ErrorsModule } from './errors/errors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPEORM_OPTIONS } from './config/typeorm.config';
import { CatsModule } from './cats/cats.modules';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    ErrorsModule,
    CatsModule,
    TypeOrmModule.forRoot({
      ...TYPEORM_OPTIONS,
    }),
  ],
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
