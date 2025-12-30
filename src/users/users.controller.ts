import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { transformer } from 'src/utils/transformer';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await transformer(this.usersService.findAll());
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await transformer(this.usersService.findById(Number(id)));
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = {
      id: Math.random() * 10,
      ...createUserDto,
    };
    this.usersService.create(newUser);

    return await transformer(newUser);
  }

  @Put(':id')
  async updatedUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ) {
    const updated = this.usersService.update(Number(id), updateUserDto);

    return await transformer(updated);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await transformer(this.usersService.delete(Number(id)));
  }
}
