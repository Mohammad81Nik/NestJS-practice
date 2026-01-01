import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('errors')
// you can also set the exception filter to be used globally by the controller,
// therefore it will catch all the exceptions that occur in all routes for a give controller
@UseFilters(HttpExceptionFilter)
export class ErrorsController {
  @Get('bad-req')
  getBadRequest() {
    throw new BadRequestException({
      message: 'custom message and response for bad request',
    });
  }

  @Get('not-found')
  getNotFound() {
    throw new NotFoundException();
  }

  @Get('auth')
  getAuth() {
    throw new UnauthorizedException();
  }

  @Get('custom-res')
  getCustomErrorResponse() {
    throw new HttpException(
      {
        error: 'something went wrong',
        cause: new Error(),
        status: HttpStatus.BAD_GATEWAY,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get('custom-filter')
  @UseFilters(HttpExceptionFilter)
  getCustomFilter() {
    throw new HttpException('something new', HttpStatus.CONFLICT);
  }
}
