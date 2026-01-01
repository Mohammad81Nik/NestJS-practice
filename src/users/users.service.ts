import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find({});
  }

  async findById(id: number) {
    const intended = (await this.userRepository.findBy({ id }))[0];

    if (!intended) {
      throw new NotFoundException('User not found');
    }

    return intended;
  }

  async create(user: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    return this.userRepository.save(user);
  }

  async update(id: number, user: Partial<CreateUserDto>) {
    await this.findById(id);

    return this.userRepository.update(id, user);
  }

  async delete(id: number) {
    await this.findById(id);

    return this.userRepository.delete(id);
  }
}
