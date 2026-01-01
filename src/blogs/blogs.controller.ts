import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto';
import { transformer } from 'src/utils/transformer';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  async getAll() {
    return await transformer(this.blogsService.getAll());
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return await transformer(
      this.blogsService.getBlogById(Number(this.getBlogById)),
    );
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await transformer(this.blogsService.create(createBlogDto));
  }

  @Post(':id')
  async update(
    @Param('id') id: string,
    @Body() editBlogDto: Partial<CreateBlogDto>,
  ) {
    return await transformer(this.blogsService.update(Number(id), editBlogDto));
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await transformer(this.blogsService.delete(Number(id)));
  }
}
