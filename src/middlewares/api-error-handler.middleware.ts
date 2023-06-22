import HttpStatus from 'http-status-codes';
import express from 'express';

export interface IError {
  status?: number;
  code?: number;
  message?: string;
}

export const notFoundErrorHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}

export const errorHandler = (
  err: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: err.code || HttpStatus.INTERNAL_SERVER_ERROR,
      message: err.message || HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
    },
  });
}
