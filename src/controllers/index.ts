import logger from '@src/logger';
import { CUSTOM_VALIDATION } from '@src/models/user';
import ApiError, { APIError } from '@src/util/errors/api-error';
import { Response } from 'express';
import mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreateUpdateErrorResponse(
    res: Response,
    err: mongoose.Error.ValidationError | Error
  ): void {
    if (err instanceof mongoose.Error.ValidationError) {
      const clientErrors = this.hundleClientError(err);
      res.status(clientErrors.code).send(
        ApiError.format({
          code: clientErrors.code,
          message: clientErrors.error,
        })
      );
    } else {
      logger.error(err);
      res.status(500).send(
        ApiError.format({
          code: 500,
          message: 'Something went wrong!',
        })
      );
    }
  }

  private hundleClientError(err: mongoose.Error.ValidationError): {
    code: number;
    error: string;
  } {
    const duplicatedKindErrors = Object.values(err.errors).filter(
      (error) => error.kind === CUSTOM_VALIDATION.DUPLICATED
    );

    if (duplicatedKindErrors.length) {
      return {
        code: 409,
        error: (err as Error).message,
      };
    }
    return {
      code: 422,
      error: (err as Error).message,
    };
  }

  protected sendErrorResponse(res: Response, apiError: APIError): Response {
    return res.status(apiError.code).send(ApiError.format(apiError));
  }
}
