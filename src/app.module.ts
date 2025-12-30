import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [CatsController, UsersController],
  providers: [UsersService],
})
export class AppModule {}
