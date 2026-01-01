import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();

    console.log(
      JSON.stringify({
        route: req.path,
        id: req.ip,
      }),
    );
  }
}
