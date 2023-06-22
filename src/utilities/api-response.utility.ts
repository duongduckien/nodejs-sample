import { Response } from 'express';
import httpStatusCodes from 'http-status-codes';

// Interfaces
import { ICookie, IPagination, IOverrideRequest } from '../interfaces/common.interface';

// Errors
import { StringError } from '../errors/string.error';

export default class ApiResponse {
  static result = (
    res: Response,
    data: object,
    status: number = 200,
    cookie: ICookie = null,
    pagination: IPagination = null,
  ) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }

    let responseData: any = { data, success: true };

    if (pagination) {
      responseData = { ...responseData, pagination };
    }

    res.json(responseData);
  };

  static error = (
    res: Response,
    status: number = 400,
    error: string = httpStatusCodes.getStatusText(status),
    override: IOverrideRequest = null,
  ) => {
    res.status(status).json({
      override,
      error: {
        message: error,
      },
      success: false,
    });
  };

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  };

  static exception(res: any, error: any) {
    if (error instanceof StringError) {
      return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, error.message);
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST, 'Something went wrong');
  }
}
