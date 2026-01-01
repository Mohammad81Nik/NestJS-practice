import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  controllers: [BlogsController],
  providers: [BlogsService],
  // by adding the blogs service provider in the exports for the blogs module,
  // we can use the same instance of this provider in other modules
  // however if we were to directly import the blogs service in other modules and 
  // set them in the providers, that would create a new instance of that provider
  // which would increase the memory consumption
  exports: [BlogsService]
})
export class BlogsModule {}
