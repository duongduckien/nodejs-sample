import express from 'express';
import * as HttpStatus from 'http-status-codes';
import { IError } from './api-error-handler.middleware';

interface IJoiErrorDetail {
  message?: string;
  path?: string;
}

interface IJoiError extends IError {
  isJoi?: boolean;
  // tslint:disable-next-line: prefer-array-literal
  details?: Array<IJoiErrorDetail>;
}

export default (
  err: IJoiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (err.isJoi) {
    const error = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map(err => ({
          message: err.message,
          param: err.path,
        })),
    };
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }

  return next(err);
};
