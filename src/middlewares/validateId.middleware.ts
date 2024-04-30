import {Injectable, NestMiddleware, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }
    
    next();
  }
}
