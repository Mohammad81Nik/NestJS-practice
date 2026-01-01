import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { type CreateUserDto, createUserSchema } from './dto/dto';
import { transformer } from 'src/utils/transformer';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return transformer(await this.usersService.findAll());
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return transformer(await this.usersService.findById(id));
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return transformer(await this.usersService.create(createUserDto));
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(createUserSchema.optional()))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() editUserDto: Partial<CreateUserDto>,
  ) {
    return transformer(await this.usersService.update(id, editUserDto));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return transformer(await this.usersService.delete(id));
  }
}
