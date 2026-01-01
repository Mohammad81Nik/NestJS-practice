import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { createBlogSchema, type CreateBlogDto } from './dto';
import { transformer } from 'src/utils/transformer';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  async getAll() {
    return await transformer(this.blogsService.getAll());
  }

  @Get(':id')
  async getBlogById(@Param('id', ParseIntPipe) id: number) {
    return await transformer(this.blogsService.getBlogById(id));
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createBlogSchema))
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await transformer(this.blogsService.create(createBlogDto));
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    id: string,
    @Body() editBlogDto: Partial<CreateBlogDto>,
  ) {
    return await transformer(this.blogsService.update(Number(id), editBlogDto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await transformer(this.blogsService.delete(Number(id)));
  }
}
