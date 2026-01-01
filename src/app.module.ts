import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { LoggerMiddleware } from './logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import { expressLogger } from 'custom-logger-middleware';
import { ErrorsModule } from './errors/errors.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    ErrorsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ilovedonuts123@',
      database: 'nestjs_practice',
      entities: [User],
      
      // synchronize: true,
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
