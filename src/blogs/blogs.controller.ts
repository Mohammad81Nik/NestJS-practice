import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { transformer } from 'src/utils/transformer';
import { type CreateBlogDto, createBlogSchema } from './dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  async findAll() {
    return transformer(await this.blogsService.findAll());
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return transformer(await this.blogsService.findById(id));
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createBlogSchema)) createBlogDto: CreateBlogDto,
  ) {
    return transformer(await this.blogsService.create(createBlogDto));
  }

  @Put(':id')
  async updated(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(createBlogSchema.optional()))
    updateBlogDto: Partial<CreateBlogDto>,
  ) {
    return transformer(await this.blogsService.update(id, updateBlogDto));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return transformer(await this.blogsService.delete(id));
  }
}
