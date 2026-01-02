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
import { CatsService } from './cats.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { type CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { transformer } from 'src/utils/transformer';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll() {
    return transformer(await this.catsService.findAll());
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return transformer(await this.catsService.findById(id));
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createCatSchema)) createCatDto: CreateCatDto,
  ) {
    return transformer(await this.catsService.create(createCatDto));
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(createCatSchema.optional()))
    updateCatDto: Partial<CreateCatDto>,
  ) {
    return transformer(await this.catsService.update(id, updateCatDto));
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return transformer(await this.catsService.delete(id));
  }
}
