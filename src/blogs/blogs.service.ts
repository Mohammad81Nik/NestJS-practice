import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './blogs.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogsRepository: Repository<Blog>,
  ) {}

  findAll() {
    return this.blogsRepository.find();
  }

  async findById(id: number) {
    const intended = (await this.blogsRepository.findBy({ id }))[0];

    if (!intended) {
      throw new NotFoundException('Blog not found');
    }

    return intended;
  }

  async create(blog: CreateBlogDto) {
    return this.blogsRepository.save(blog);
  }

  async update(id: number, blog: Partial<CreateBlogDto>) {
    await this.findById(id);

    return this.blogsRepository.update(id, blog);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.blogsRepository.delete(id);
  }
}
