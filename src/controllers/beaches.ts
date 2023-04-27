import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { AuthMiddleware } from '@src/middlewares/auth';
import { Beach } from '@src/models/beach';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('beaches')
@ClassMiddleware(AuthMiddleware)
export class BeachesController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const beach = new Beach({ ...req.body, ...{ user: req.decoded?.id } });
      const result = await beach.save();
      res.status(201).send(result);
    } catch (err) {
      this.sendCreateUpdateErrorResponse(res, err as Error);

      // if (err instanceof mongoose.Error.ValidationError) {
      //   res.status(422).send({ error: (err as Error).message });
      // } else {
      //   logger.error(err),
      //     res.status(500).send({ error: 'Internal Server Error' });
      // }
    }
  }
}
