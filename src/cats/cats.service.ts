import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cats.entity';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  findAll() {
    return this.catsRepository.find();
  }

  async findById(id: number) {
    const intended = (await this.catsRepository.findBy({ id }))[0];

    if (!intended) {
      throw new NotFoundException('Cat not found');
    }

    return intended;
  }

  create(cat: CreateCatDto) {
    return this.catsRepository.save(cat);
  }

  async update(id: number, cat: Partial<CreateCatDto>) {
    await this.findById(id);

    return this.catsRepository.update(id, cat);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.catsRepository.delete(id);
  }
}
