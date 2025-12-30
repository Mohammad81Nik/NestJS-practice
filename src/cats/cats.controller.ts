import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  getCats() {
    return [
      { id: 1, name: 'cats1' },
      { id: 2, name: 'cats2' },
    ];
  }

  @Get('breed')
  @HttpCode(203)
  getCatBreeds() {
    return [{ id: 1, breed: 'persian' }];
  }

  @Get('/age')
  getCatAge(@Res() response) {
    // by using the Res() decorator, we would have access to the legacy response from express and its handlers
    response.status(202).json({
      message: 'success',
      data: 'something',
    });
  }

  @Post('/new')
  createCat(@Req() req: Request) {
    const body = req.body;

    return {
      message: 'success',
      data: body,
    };
  }

  @Get('details/:catId')
  getCatDetails(@Param('catId') catId) {
    return {
      message: 'success',
      data: `You called this route with the cat id of ${catId}`,
    };
  }

  @Get('variety')
  getCatVarieties(@Query('size') size: string, @Query('age') age: number) {
    return {
      message: 'success',
      data: {
        size,
        age,
      },
    };
  }

  @Get('async')
  async getAsyncCats(): Promise<{ message: string; data: any }> {
    return new Promise((res) =>
      setTimeout(() => res({ message: 'success', data: 'cats' }), 2000),
    );
  }

  @Post('new/typed')
  async createTypedCat(
    @Body() createCatDto: CreateCatDto,
  ): Promise<{ message: string; data: any }> {
    return new Promise((res) =>
      setTimeout(() => res({ message: 'success', data: createCatDto }), 2000),
    );
  }
}
