import { Response } from 'express';
import { APIError } from '@src/util/errors/api-error';
import ApiError from '@src/util/errors/api-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class BaseController<T> {
  protected sendErrorResponse(res: Response, apiError: APIError): Response {
    return res.status(apiError.code).send(ApiError.format(apiError));
  }
}
