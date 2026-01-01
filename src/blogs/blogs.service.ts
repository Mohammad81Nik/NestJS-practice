import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from './interface';
import { CreateBlogDto } from './dto';

@Injectable()
export class BlogsService {
  private readonly blogs: Blog[] = [];

  getAll() {
    return this.blogs;
  }

  getBlogById(id: number) {
    const intended = this.blogs.find((blog) => blog.id === id);

    if (!intended) {
      throw new NotFoundException();
    }

    return intended;
  }

  create(blog: CreateBlogDto) {
    const newBlog = {
      id: this.blogs.length + 1,
      ...blog,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.blogs.push(newBlog);

    return newBlog;
  }

  update(id: number, blog: Partial<CreateBlogDto>) {
    const intended = this.getBlogById(id);

    const intendedIndex = this.blogs.indexOf(intended);

    const updatedBlog = {
      ...intended,
      ...blog,
      updated_at: new Date(),
    };

    this.blogs[intendedIndex] = updatedBlog;

    return updatedBlog;
  }

  delete(id: number) {
    const intended = this.getBlogById(id);

    const intendedIndex = this.blogs.indexOf(intended);

    this.blogs.splice(intendedIndex, 1);

    return intended;
  }
}
