import express from 'express';
import httpStatusCodes from 'http-status-codes';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';

export const isAdmin = () => {
  return async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    if (req.user.email !== 'admin@gmail.com') {
      return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
    }
    next();
  };
};
